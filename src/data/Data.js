import { HTTPStatus } from "../constants/constants";
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

    if (response.status === HTTPStatus.ok) {
      return response.data;
    } else {
      return null;
    }
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

  verifyUserTypingPattern = async (typingPattern, email) => {
    const response = await axios({
      url: "http://localhost:8000/verify",
      method: "post",
      data: {
        typing_pattern: typingPattern,
        email: email,
      },
    }).catch((error) => {
      return error.response;
    });
    if (response.status === HTTPStatus.ok) {
      return response.data;
    } else {
      return null;
    }
  };

  getSentence = async () => {
    const response = await axios({
      url: "http://localhost:8000/sentence",
      method: "get",
    }).catch((error) => {
      return error.response;
    });
    console.log(response);
    if (response.status === HTTPStatus.ok) {
      return response.data;
    } else {
      return null;
    }
  };
}
