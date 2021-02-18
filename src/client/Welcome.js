import { Box, Typography } from "@material-ui/core";

import { GeneralPaperContainer } from "./GeneralPaperContainer";
import React from "react";

export const Welcome = () => {
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
          <Typography variant="h4" align="center" style={{ paddingBottom: 50 }}>
            Welcome to Typing Game built with TypingDNA authentication!
          </Typography>
          <Typography variant="h5" align="center" style={{ paddingBottom: 50 }}>
            The game is simple: type as many sentences as you can as correctly
            as you can in the shortest time...
          </Typography>
          <Typography variant="h5" align="center">
            But your typing style will have to be verified by TypingDNA
            everytime and if you fail the TypingDNA verify check - you lose the
            game!
          </Typography>
        </Box>
      }
    />
  );
};
