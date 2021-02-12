import React, { useRef, useState } from "react";

import { Signup } from "./Signup";

export const SignupContainer = (props) => {
  const { context } = props;

  const [errors, setErrors] = useState(null);

  const textFieldRef = useRef(null);
  const simpleEmailRegex = new RegExp();

  const onSubmitSignup = async () => {
    const email = textFieldRef.current.value;
    if (email !== "" && simpleEmailRegex.test(email)) {
      const signUpResponse = await context.actions.signUp(email);
      console.log(signUpResponse);
    }
  };

  return <Signup onSubmitSignup={onSubmitSignup} textFieldRef={textFieldRef} />;
};
