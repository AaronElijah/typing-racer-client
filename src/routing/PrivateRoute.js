import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { Context } from "../data/Context";

// Something wrong with render vs. component
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const globalStore = useContext(Context);
  const { state, dispatch } = globalStore;
  return (
    <Route
      {...rest}
      render={(props) =>
        state.isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signup",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
