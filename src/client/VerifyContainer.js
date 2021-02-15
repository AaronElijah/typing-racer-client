import React, { useContext, useRef, useState } from "react";

import { Context } from "../data/Context";
import { Data } from "../data/Data";
import { TypingDNA } from "../typingdna";
import { Verify } from "./Verify";
import { useHistory } from "react-router-dom";

export const VerifyContainer = () => {
  const sentenceToCopy =
    "Verify this long sentence - hopefully a longer sentence means quicker verification";
  const globalStore = useContext(Context);
  const { state, dispatch } = globalStore;
  const dataClient = new Data();
  const history = useHistory();

  const [verifiedState, setVerifiedState] = useState(false);
  const [shouldOpenSnackbar, setShouldOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("unverified");

  const textFieldId = "signup-id";
  const textFieldRef = useRef(null);

  // Might want to useEffect the tdna so that we garbage collect the old one
  // We don't want previous typing patterns affecting newer ones
  var tdna = new TypingDNA();
  tdna.addTarget(textFieldId);

  const onSubmitTypingPattern = async (tdna) => {
    const typingPattern = tdna.getTypingPattern({
      type: 0,
      targetId: textFieldId,
    });
    const email = state.userEmail;

    const verifyResponse = await dataClient.verifyUserTypingPattern(
      typingPattern,
      email
    );

    if (verifyResponse === null) {
      setSnackbarMessage("Whoops, you aren't registered");
      setShouldOpenSnackbar(true);
    }

    if (verifyResponse.action === "enroll") {
      dispatch({
        type: "auth/verify",
        isTypingVerified: false,
        numberOfVerificationAttempts: state.numberOfVerificationAttempts + 1,
      });
      setSnackbarMessage("Keep verifying - we need more typing");
    } else {
      dispatch({
        type: "auth/verify",
        isTypingVerified: true,
      });
      setSnackbarMessage("You are verified - close to play the game");
      setVerifiedState(true);
    }
    setShouldOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShouldOpenSnackbar(false);
    if (verifiedState) {
      history.push("/play");
    }
  };

  return (
    <Verify
      onSubmit={() => onSubmitTypingPattern(tdna)}
      sentenceToCopy={sentenceToCopy}
      textFieldId={textFieldId}
      textFieldRef={textFieldRef}
      openTypeInputSnackbar={shouldOpenSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
      snackbarMessage={snackbarMessage}
    />
  );
};
