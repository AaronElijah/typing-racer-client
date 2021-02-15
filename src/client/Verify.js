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

export const Verify = (props) => {
  const {
    onSubmit,
    sentenceToCopy,
    textFieldId,
    textFieldRef,
    openTypeInputSnackbar,
    handleCloseSnackbar,
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
            open={openTypeInputSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert onClose={handleCloseSnackbar} severity="success">
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
          <Typography
            paragraph
            color="primary"
            variant="h5"
            display="block"
            style={{
              paddingTop: "30px",
              width: "300px",
              paddingInline: "20px",
            }}
          >
            {sentenceToCopy}
          </Typography>
          <TextField
            id={textFieldId}
            inputRef={textFieldRef}
            variant="outlined"
            multiline
            placeholder="Copy the text please"
            style={{
              paddingBottom: "30px",
              paddingInline: "30px",
              paddingTop: "15px",
              width: "300px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onSubmit();
              textFieldRef.current.value = "";
            }}
            style={{
              height: "80px",
              width: "160px",
            }}
          >
            Next
          </Button>
        </Box>
      }
    />
  );
};
