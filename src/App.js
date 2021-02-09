import "./App.css";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

// import { TypeInputFormContainer } from "./client/TypeInputFormContainer";
import { TypingDNA } from "./typingdna";
import axios from "axios";

const signUp = ({ typingPattern }) => {
  axios({
    url: "http://localhost:8000/signup",
    method: "post",
    data: {
      email: "fake@email.com",
      name: "fakename",
      username: "fakeusername",
      typing_patterns: typingPattern,
    },
  })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
      console.log(error.request);
    });
};

const App = () => {
  var tdna = new TypingDNA();
  tdna.addTarget("text-id");

  return (
    <div className="App">
      <Container
        maxWidth="md"
        style={{ backgroundColor: "lightskyblue", height: "100%" }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
        >
          <Typography paragraph color="primary" variant="body1" display="block">
            {"Copy this text into the textfield"}
          </Typography>
          <TextField id="text-id" />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const typingPattern = tdna.getTypingPattern({
                type: 0,
                targetId: "text-id",
              });
              signUp({
                typingPattern: typingPattern,
              });
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default App;
