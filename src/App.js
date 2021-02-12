import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Container } from "@material-ui/core";
import { Header } from "./client/Header";
import { LoginContainer } from "./client/LoginContainer";
import { SignupContainer } from "./client/SignupContainer";
import { TypeInputContainer } from "./client/TypeInputContainer";
import { withContext } from "./data/Context";

const HeaderWithContext = withContext(Header);
const TypeInputContainerWithContext = withContext(TypeInputContainer);
const SignupContainerWithContext = withContext(SignupContainer);
const LoginContainerWithContext = withContext(LoginContainer);

const App = () => {
  const sentenceToCopy = "Verify this sentence";
  return (
    <BrowserRouter>
      <div className="app">
        <HeaderWithContext />

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
              <Route
                exact
                path="/verify"
                render={() => (
                  <TypeInputContainerWithContext
                    sentenceToCopy={sentenceToCopy}
                  />
                )}
              />
              <Route
                path="/signup"
                render={() => <SignupContainerWithContext />}
              />
              <Route
                path="/login"
                render={() => <LoginContainerWithContext />}
              />
            </Switch>
          </Container>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
