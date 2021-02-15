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

export const Login = (props) => {
  const {
    onSubmitLogin,
    textFieldRef,
    openLoginSnackbar,
    handleCloseSnackbar,
    loginState,
    snackbarMessage,
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
            open={openLoginSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handleCloseSnackbar}
              severity={
                loginState !== null && loginState.search("failed") > -1
                  ? "error"
                  : "success"
              }
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
          <Typography variant="h5" align="center">
            Welcome to typing game!
          </Typography>
          <Typography variant="h6" align="center">
            Let's login you in
          </Typography>
          <TextField
            id="login-email-textfield"
            inputRef={textFieldRef}
            label="Type email"
            variant="filled"
            style={{ marginTop: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmitLogin()}
            style={{ marginTop: "20px", height: "60px", width: "120px" }}
          >
            Log in
          </Button>
        </Box>
      }
    />
  );
};
