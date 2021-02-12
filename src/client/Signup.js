import { Box, Button, TextField, Typography } from "@material-ui/core";

import { GeneralPaperContainer } from "./GeneralPaperContainer";
import React from "react";

export const Signup = (props) => {
  const { onSubmitSignup, textFieldRef } = props;
  return (
    <GeneralPaperContainer
      render={
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
        >
          <Typography variant="h5" align="center">
            Wanna play our game? Great! Tell us your email
          </Typography>
          <Typography variant="h6" align="center">
            (Don't worry: we won't email you a thing)
          </Typography>
          <TextField
            id="signup-email-textfield"
            inputRef={textFieldRef}
            label="Type email"
            variant="filled"
            style={{ marginTop: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmitSignup()}
            style={{
              marginTop: "20px",
              height: "60px",
              width: "120px",
            }}
          >
            Signup
          </Button>
        </Box>
      }
    />
  );
};
