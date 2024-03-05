import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { ChatBubbleOutline } from "@mui/icons-material";

interface MyComponentProps {
  loading: boolean;
  onClick: () => void;
}

const BeginChat: React.FC<MyComponentProps> = ({ loading, onClick }) => {
  return (
    <>
      <Typography variant="h6">
        Click the button to start a chat with a LLM bot.
      </Typography>
      <Button
        variant="contained"
        startIcon={<ChatBubbleOutline />}
        disabled={loading}
        onClick={() => {
          onClick();
        }}
        sx={{ marginTop: "12px" }}
      >
        {loading ? "Loading..." : "Start Chat"}
        <Analytics />
      </Button>
    </>
  );
};

export default BeginChat;
