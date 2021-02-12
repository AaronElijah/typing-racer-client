import React, { useRef, useState } from "react";

import { Login } from "./Login";
import { useHistory } from "react-router-dom";

export const LoginContainer = (props) => {
  const { context } = props;
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
      const loginResponse = await context.actions.login(email);

      // We want a way to direct the user to the game or to verify depending on whether they are already verified or not
      // The loginResponse should have an is_verified attribute, which we can use to direct them
      if (loginResponse.isSuccess) {
        setShouldOpenSnackbar(true);
      }
      setLoginState(loginResponse.message);
    }
  };

  const handleCloseSnackbar = () => {
    setShouldOpenSnackbar(false);
    history.push("/verify");
  };

  return (
    <Login
      onSubmitLogin={onSubmitLogin}
      textFieldRef={textFieldRef}
      openLoginSnackbar={shouldOpenSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
};
