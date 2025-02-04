import React, { useState } from "react";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Alert,
} from "@mui/material";

import { Analytics } from "@vercel/analytics/react"
import Chat, { Bubble, useMessages } from "@chatui/core";
import BeginChat from "./components/BeginChat";
import ChatOptions from "./components/ChatOptions";
import ReplyButton from "./components/ReplyButton";

import fetchReply from "./utils/fetchReply";

import "@chatui/core/dist/index.css";

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addSystemReply = (reply: string) => {
    appendMsg({
      type: "text",
      content: { text: reply },
      position: "left",
    });
  };

  const addHumanReply = (reply: string) => {
    appendMsg({
      type: "text",
      content: { text: reply },
      position: "right",
    });
  };



  const sendChat = async (text: string): Promise<string> => {
    let reply = "";

    try {
      setLoading(true);
      const reply = await fetchReply(messages, text);
      addSystemReply(reply);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }

    return reply;
  };

  const handleStartButtonClick = async () => {
    await sendChat("");
    setShowChat(true);
  };

  const handleSend = async (type: string, val: string) => {
    if (type === "text" && val.trim()) {
      addHumanReply(val);

      setTyping(true);
      await sendChat(val);
    }
  };

  function renderMessageContent(msg: any) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">🤖 LLM Chat</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Grid container spacing={2} sx={{ my: 4 }}>
          {!showChat && (
            <Grid item xs={12}>
              <BeginChat loading={loading} onClick={handleStartButtonClick} />
            </Grid>
          )}

          {showChat && (
            <>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">Error: {error}</Alert>
                </Grid>
              )}

              <Grid item xs={12} sx={{ height: "400px" }}>
                <Chat
                  messages={messages}
                  locale="en-US"
                  placeholder="Type here..."
                  renderMessageContent={renderMessageContent}
                  onSend={handleSend}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{ marginLeft: "12px" }}
                  onClick={() => {
                    setShowChat(false);
                  }}
                >
                  End Chat
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}
