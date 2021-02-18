import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import { GeneralPaperContainer } from "./GeneralPaperContainer";
import React from "react";

export const Game = (props) => {
  const {
    sentenceArray,
    stopwatchTime,
    currentWordIndex,
    handleChange,
    textFieldRef,
    isEachWordCorrectArray,
    targetWordSpeed,
    isGameOver,
    handleCloseBackdrop,
    handleExtraKeysDown,
    onDialogOpening,
    textFieldId,
    dialogMessage,
    isWin,
    isFailedTyping,
    hasCheckedTypingPattern,
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
          <Typography
            variant="h6"
            align="center"
            style={{ marginBottom: "40px" }}
          >
            Type the sentence below as fast and correctly as you can!
          </Typography>
          <Grid container>
            {sentenceArray.map((word, index) => {
              let colour;
              if (
                isEachWordCorrectArray &&
                index < isEachWordCorrectArray.length
              ) {
                if (isEachWordCorrectArray[index]) {
                  colour = "#b3ffb3";
                } else {
                  colour = "#ffb3b3";
                }
              } else {
                colour = "white";
              }
              return (
                <Typography
                  key={index}
                  display="inline"
                  variant="h5"
                  style={{
                    marginRight: "7px",
                    background: index === currentWordIndex ? "#dddddd" : colour,
                  }}
                >
                  {word}
                </Typography>
              );
            })}
          </Grid>
          <TextField
            id={textFieldId}
            multiline
            autoFocus
            autoComplete="off"
            helperText="Type the sentence as quickly and correctly as you can"
            inputProps={{
              style: { fontSize: 20, lineHeight: "30px" },
              autoFocus: true,
            }}
            style={{ width: "500px", marginBottom: "35px", marginTop: "70px" }}
            onChange={handleChange}
            inputRef={textFieldRef}
          ></TextField>
          <Grid container justify="space-around" spacing={7}>
            <Box flexDirection="column" alignItems="center">
              <Typography variant="h1" align="center">
                {targetWordSpeed}
              </Typography>
              <Typography align="center">WPM Target</Typography>
            </Box>
            <Box flexDirection="column" alignItems="center">
              <Typography variant="h1" align="center">
                {Math.round(stopwatchTime)}
              </Typography>
              <Typography>Seconds</Typography>
            </Box>
          </Grid>
          <Dialog
            open={
              isGameOver &&
              (hasCheckedTypingPattern === true ||
                stopwatchTime <= 0 ||
                isFailedTyping === true)
            }
            style={{ color: "#fff" }}
            onClick={handleCloseBackdrop}
            onKeyDown={handleExtraKeysDown}
            onEnter={onDialogOpening}
          >
            <DialogTitle>{isWin === true ? "Excellent!" : "Lost!"}</DialogTitle>
            <DialogContent dividers>
              <DialogContentText>{dialogMessage}</DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      }
    />
  );
};
