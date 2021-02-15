import { Box, Paper } from "@material-ui/core";

import React from "react";

export const GeneralPaperContainer = ({ render }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
    >
      <div>
        <Paper
          elevation={6}
          style={{ maxWidth: "600px", minWidth: "600px", minHeight: "600px" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            padding={5}
            m={10}
            mx="auto"
            alignItems="center"
          >
            {render}
          </Box>
        </Paper>
      </div>
    </Box>
  );
};
