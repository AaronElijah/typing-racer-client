import React, { useContext, useRef, useState } from "react";

import { Context } from "../data/Context";
import { Data } from "../data/Data";
import { Signup } from "./Signup";
import { useHistory } from "react-router-dom";

export const SignupContainer = () => {
  const globalStore = useContext(Context);
  const { state, dispatch } = globalStore;
  const dataClient = new Data();
  const history = useHistory();

  const [signupState, setSignupState] = useState(false);
  const [shouldOpenSnackbar, setShouldOpenSnackbar] = useState(false);

  const textFieldRef = useRef(null);
  const simpleEmailRegex = new RegExp();

  const onSubmitSignup = async () => {
    const email = textFieldRef.current.value;
    if (email !== "" && simpleEmailRegex.test(email)) {
      const signUpResponse = await dataClient.signUp(email);

      setShouldOpenSnackbar(true);
      if (signUpResponse !== null) {
        dispatch({ type: "auth/signup", email: email });
        setSignupState(true);
      } else {
        console.log("Sign up failed, display this to user!");
        setSignupState(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setShouldOpenSnackbar(false);
    if (signupState) {
      history.push("/verify");
    }
  };

  return (
    <Signup
      onSubmitSignup={onSubmitSignup}
      textFieldRef={textFieldRef}
      openSnackbar={shouldOpenSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
      signupState={signupState}
    />
  );
};
