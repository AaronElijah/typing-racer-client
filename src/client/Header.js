import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";

import { Context } from "../data/Context";
import { Link } from "react-router-dom";

export const Header = () => {
  const globalStore = useContext(Context);
  const { state, dispatch } = globalStore;
  return (
    <Box display="flex" justifyContent="center">
      <AppBar position="fixed">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography edge="start" flexgrow={1} variant="h6">
            Welcome to the Type Racer with Keyboard
          </Typography>
          <Box>
            {state.isAuthenticated ? (
              <React.Fragment>
                <span>Welcome, {state.userEmail}!</span>
                <Button
                  color="inherit"
                  size="large"
                  onClick={() => {
                    dispatch({ type: "auth/logout" });
                  }}
                >
                  <Link
                    className="logout"
                    to="/login"
                    style={{ color: "white" }}
                  >
                    Log Out
                  </Link>
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button color="inherit" size="large">
                  <Link
                    className="signup"
                    to="/signup"
                    style={{ color: "white" }}
                  >
                    Sign Up
                  </Link>
                </Button>
                <Button color="inherit" size="large">
                  <Link
                    className="login"
                    to="/login"
                    style={{ color: "white" }}
                  >
                    Log In
                  </Link>
                </Button>
              </React.Fragment>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
