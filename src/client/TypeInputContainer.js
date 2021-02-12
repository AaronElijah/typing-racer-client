import React, { useRef } from "react";

import { TypeInput } from "./TypeInput";
import { TypingDNA } from "../typingdna";

export const TypeInputContainer = (props) => {
  const { context, sentenceToCopy } = props;
  const textFieldId = "signup-id";
  const textFieldRef = useRef(null);

  var tdna = new TypingDNA();
  tdna.addTarget(textFieldId);

  const onSubmitTypingPattern = (tdna) => {
    const typingPattern = tdna.getTypingPattern({
      type: 0,
      targetId: textFieldId,
    });
    const email = context.state.userEmail;
    // Send email to an action in the context api

    console.log(typingPattern);
  };

  return (
    <TypeInput
      onSubmit={() => onSubmitTypingPattern(tdna)}
      sentenceToCopy={sentenceToCopy}
      textFieldId={textFieldId}
      textFieldRef={textFieldRef}
    />
  );
};
