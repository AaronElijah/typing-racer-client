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
          style={{ maxWidth: "400px", minWidth: "300px", minHeight: "300px" }}
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
