import React, { useContext, useRef, useState } from "react";

import { Context } from "../data/Context";
import { Data } from "../data/Data";
import { HTTPStatus } from "../constants/constants";
import { Login } from "./Login";
import { useHistory } from "react-router-dom";

export const LoginContainer = (props) => {
  const globalStore = useContext(Context);
  const { state, dispatch } = globalStore;
  const dataClient = new Data();
  const history = useHistory();

  const [loginState, setLoginState] = useState(null);
  const [shouldOpenSnackbar, setShouldOpenSnackbar] = useState(false);

  const textFieldRef = useRef(null);
  const simpleEmailRegex = new RegExp(
    `([a-zA-Z0-9]+)([@]{1})([a-zA-Z0-9]+)([\\.]{1})([a-zA-Z0-9]{3})+`
  );

  const onSubmitLogin = async () => {
    const email = textFieldRef.current.value;
    if (email !== "" && simpleEmailRegex.test(email)) {
      const loginResponse = await dataClient.login(email);

      if (loginResponse.status === HTTPStatus.ok) {
        dispatch({
          type: "auth/login",
          email: email,
          isVerified: loginResponse.is_verified,
        });

        if (loginResponse.data.is_verified === true) {
          setLoginState("success:verified");
        } else {
          setLoginState("success:unverified");
        }
      } else if (loginResponse.status === HTTPStatus.not_found) {
        setLoginState("failed:not_found");
      } else {
        setLoginState("failed:other");
      }
      setShouldOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShouldOpenSnackbar(false);
    if (loginState === "success:unverified") {
      history.push("/verify");
    } else if (loginState === "success:verified") {
      history.push("/play");
    }
  };

  let snackbarMessage;
  if (loginState !== null) {
    snackbarMessage =
      loginState.search("failed") > -1
        ? loginState.search("not_found") > -1
          ? "Sign up first"
          : "Whoops, something went wrong"
        : loginState.search("verified") > -1
        ? "You are already verified - close popup to play"
        : "Great! Now let's verify your typing";
  }
  return (
    <Login
      onSubmitLogin={onSubmitLogin}
      textFieldRef={textFieldRef}
      openLoginSnackbar={shouldOpenSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
      loginState={loginState}
      snackbarMessage={snackbarMessage}
    />
  );
};
