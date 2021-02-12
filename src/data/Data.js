import axios from "axios";

export class Data {
  signUp = async (email) => {
    const response = await axios({
      url: "http://localhost:8000/signup",
      method: "post",
      data: {
        email: email,
      },
    }).catch((error) => {
      return error.response;
    });
    return response;
  };

  login = async (email) => {
    const response = await axios({
      url: "http://localhost:8000/login",
      method: "post",
      data: {
        email: email,
      },
    }).catch((error) => {
      return error.response;
    });
    return response;
  };

  verifyUserTypingPattern = async ({ typingPattern, email }) => {
    const response = await axios({
      url: "http://localhost:8000/verify",
      method: "post",
      data: {
        typing_pattern: typingPattern,
        // id: email,
        id: "fake@email.com",
      },
    });
    return response.data;
  };
}
