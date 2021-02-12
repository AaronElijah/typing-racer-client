import React, { Component } from "react";

import { Data } from "./Data";
import { HTTPStatus } from "../constants/constants";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    userEmail: null,
    isAuthenticated: false,
    isTypingVerified: false,
    numberOfVerificationAttempts: 0,
    score: 0,
    isGameOver: false,
    isGameStarted: false,
  };

  constructor() {
    super();
    this.dataClient = new Data();
  }

  signUp = async (email) => {
    const messageStruct = {
      isSuccess: false,
      message: "",
    };
    const signUpRepsonse = await this.dataClient.signUp(email);

    if (signUpRepsonse.status === HTTPStatus.ok) {
      this.state = { ...this.state, userEmail: email, isAuthenticated: true };
      return {
        isSuccess: true,
        message: "Successful signup",
      };
    } else if (signUpRepsonse.status === HTTPStatus.conflict) {
      return { ...messageStruct, message: "User already exists" };
    } else if (signUpRepsonse.status === HTTPStatus.unprocessable) {
      return { ...messageStruct, message: "Invalid email" };
    }
    return messageStruct;
  };

  login = async (email) => {
    const messageStruct = {
      isSuccess: false,
      message: "",
    };

    const loginResponse = await this.dataClient.login(email);

    if (loginResponse.status === HTTPStatus.ok) {
      const userInfo = loginResponse.data;
      this.state = {
        ...this.state,
        userEmail: email,
        isAuthenticated: true,
        isTypingVerified: userInfo.is_verified,
      };
      return { isSuccess: true, message: "Successful login" };
    } else if (loginResponse.status === HTTPStatus.not_found) {
      this.state = {
        ...this.state,
        userEmail: null,
        isAuthenticated: false,
      };
      return { ...messageStruct, message: "User doesn't exist" };
    } else if (loginResponse.status === HTTPStatus.unprocessable) {
      return { ...messageStruct, message: "Invalid email" };
    }
  };

  render() {
    const value = {
      state: this.state,
      actions: {
        signUp: this.signUp,
        login: this.login,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
