import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Container } from "@material-ui/core";
import { GameContainer } from "./client/GameContainer";
import { Header } from "./client/Header";
import { LoginContainer } from "./client/LoginContainer";
import { PrivateRoute } from "./routing/PrivateRoute";
import { SignupContainer } from "./client/SignupContainer";
import { VerifyContainer } from "./client/VerifyContainer";

const App = () => {
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
