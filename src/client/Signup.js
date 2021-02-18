import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";

import { GeneralPaperContainer } from "./GeneralPaperContainer";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";

export const Signup = (props) => {
  const {
    onSubmitSignup,
    textFieldRef,
    openSnackbar,
    handleCloseSnackbar,
    signupState,
  } = props;
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
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handleCloseSnackbar}
              severity={signupState === "failed" ? "error" : "success"}
            >
              {signupState
                ? "Great - let's verify your typing pattern"
                : "Whoops, something went wrong"}
            </MuiAlert>
          </Snackbar>
          <Typography variant="h5" align="center">
            Wanna play our game? Great! Give us a fake or demo email to try
          </Typography>
          <Typography variant="h6" align="center">
            (We will then enroll your typing using TypingDNA)
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
