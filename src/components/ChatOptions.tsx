import React from 'react';
import { FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox } from '@mui/material';

interface MyComponentProps {

}

const ChatOptions: React.FC<MyComponentProps> = ({  }) => {
  return (
    <FormControl component="fieldset">
    <FormLabel component="legend">Options</FormLabel>

    <FormGroup row aria-label="position">
    </FormGroup>
  </FormControl>
  );
};

export default ChatOptions;