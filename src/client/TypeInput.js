import { Box, Button, TextField, Typography } from "@material-ui/core";

import { GeneralPaperContainer } from "./GeneralPaperContainer";
import React from "react";

export const TypeInput = (props) => {
  const { onSubmit, sentenceToCopy, textFieldId, textFieldRef } = props;
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
