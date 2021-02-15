import React, { createContext, useReducer } from "react";

const initialState = {
  userEmail: null,
  isAuthenticated: false,
  isTypingVerified: false,
  numberOfVerificationAttempts: 0,
  score: 0,
  isGameOver: false,
  isGameStarted: false,
};

const Context = createContext(initialState);

const StateProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "auth/verify":
        const newAttempts = action.numberOfVerificationAttempts
          ? action.numberOfVerificationAttempts
          : state.numberOfVerificationAttempts;
        return {
          ...state,
          isTypingVerified: action.isTypingVerified,
          numberOfVerificationAttempts: newAttempts,
        };
      case "auth/login":
        return {
          ...state,
          userEmail: action.email,
          isAuthenticated: true,
          isTypingVerified: action.isVerified,
        };
      case "auth/signup":
        return {
          ...state,
          userEmail: action.email,
          isAuthenticated: true,
          isTypingVerified: false,
        };
      case "auth/logout":
        return initialState;
      default:
        return state;
    }
  }, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, StateProvider };
