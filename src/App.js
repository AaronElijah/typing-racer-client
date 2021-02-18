import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useContext } from "react";

import { Container } from "@material-ui/core";
import { Context } from "./data/Context";
import { GameContainer } from "./client/GameContainer";
import { Header } from "./client/Header";
import { LoginContainer } from "./client/LoginContainer";
import { PrivateRoute } from "./routing/PrivateRoute";
import { SignupContainer } from "./client/SignupContainer";
import { VerifyContainer } from "./client/VerifyContainer";
import { Welcome } from "./client/Welcome";

const App = () => {
  const globalStore = useContext(Context);
  const { state } = globalStore;
  if (state.highScore > 30) {
    document.title = `Your Highscore is ${state.highScore}`;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <div>
          <Container
            maxWidth="xl"
            style={{
              backgroundColor: "lightskyblue",
              height: "1000px",
              width: "100%",
            }}
          >
            <Switch>
              <Route exact path="/" render={() => <Welcome />}></Route>
              <PrivateRoute exact path="/verify" component={VerifyContainer} />
              <PrivateRoute exact path="/play" component={GameContainer} />
              <Route path="/signup" render={() => <SignupContainer />} />
              <Route path="/login" render={() => <LoginContainer />} />
            </Switch>
          </Container>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
