import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";

import { Link } from "react-router-dom";
import React from "react";

export const Header = (props) => {
  return (
    <Box display="flex" justifyContent="center">
      <AppBar position="fixed">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography edge="start" flexgrow={1} variant="h6">
            Welcome to the Type Racer with Keyboard
          </Typography>
          <Box>
            <Button color="inherit" size="large">
              <Link className="signin" to="/signup" style={{ color: "white" }}>
                Sign Up
              </Link>
            </Button>
            <Button color="inherit" size="large">
              <Link className="signin" to="/login" style={{ color: "white" }}>
                Log In
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
