import React, { useContext, useEffect, useRef, useState } from "react";

import { Context } from "../data/Context";
import { Data } from "../data/Data";
import { Game } from "./Game";
import { TypingDNA } from "../typingdna";

const defaultSentence = "Loading Sentence...";

const calculateWordPoints = (targetWord, writtenWord) => {
  // Get the difference in number of letters
  const lettersDiff = Math.abs(targetWord.length - writtenWord.length);
  // The number of correct letters (in place) minus letters diff
  let letterScore = 0;
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord.charAt(i) === writtenWord.charAt(i)) {
      letterScore = ++letterScore;
    }
  }
  letterScore = Math.max(letterScore - lettersDiff, 0);
  return letterScore;
};

const calculateInitialStopwatchTime = (sentenceArray, targetWordSpeed) => {
  const totalChars = sentenceArray.reduce((total, word) => {
    return total + word.length;
  }, 0);
  const approxWords = Math.ceil(totalChars / 5);
  const stopwatchTime = (approxWords * 60) / targetWordSpeed;
  return stopwatchTime;
};

var tdna = new TypingDNA();

export const GameContainer = () => {
  const globalStore = useContext(Context);
  const { state, dispatch } = globalStore;

  const [sentenceToCopy, setSentenceToCopy] = useState(defaultSentence);
  const sentenceArray = sentenceToCopy.split(" ");

  const [isGettingSentence, setIsGettingSentence] = useState(true);
  const [targetWordSpeed, setTargetWordSpeed] = useState(20);
  const [stopwatchTime, setStopwatchTime] = useState(0);

  const [isGameLoaded, setIsGameLoaded] = useState(true);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [hasCheckedTypingPattern, setHasCheckedTypingPattern] = useState(false);
  const [isFailedTyping, setIsFailedTyping] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const textFieldId = "game-textfield-input";
  const textFieldRef = useRef();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctLettersPerWord, setCorrectLettersPerWord] = useState([]);
  const [writtenWordArray, setWrittenWordArray] = useState([]);
  const [isEachWordCorrectArray, setIsEachWordCorrectArray] = useState([]);

  useEffect(() => {
    tdna.addTarget(textFieldId);
  }, []);

  useEffect(() => {
    if (isGameRunning && stopwatchTime !== 0) {
      const interval = setInterval(() => {
        const newTime = stopwatchTime - 1;
        if (newTime <= 0) {
          setIsWin(false);
          setIsGameOver(true);
          setDialogMessage("You ran out of time!");
        }
        if (stopwatchTime < 0 && newTime < 0) {
          return null;
        } else {
          setStopwatchTime(newTime);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else if (isGameLoaded && sentenceToCopy !== defaultSentence) {
      const newStopwatchTime = calculateInitialStopwatchTime(
        sentenceArray,
        targetWordSpeed
      );
      setStopwatchTime(newStopwatchTime);
      setIsGameLoaded(false);
    }
    //eslint-disable-next-line
  }, [stopwatchTime, sentenceToCopy, isGameRunning, isGameLoaded]);

  useEffect(() => {
    tdna.start();
    const getSentence = async () => {
      const dataClient = new Data();
      const newSentence = await dataClient.getSentence();
      if (newSentence !== null) {
        setSentenceToCopy(newSentence);
        setIsGettingSentence(false);
        setIsGameLoaded(true);
      } else {
        return defaultSentence;
      }
    };

    if (sentenceToCopy === defaultSentence) {
      getSentence();
    }
  }, [sentenceToCopy]);

  const handleNewTextInput = (event) => {
    if (isGettingSentence === true || isGameOver) {
      return null;
    }

    const writtenChars = event.target.value;
    const lastChar = writtenChars[writtenChars.length - 1];

    if (isGameRunning === false) {
      setIsGameRunning(true);
    }

    if (lastChar === " " && currentWordIndex === sentenceArray.length) {
      // Do nothing
      return null;
    }

    if (lastChar === " ") {
      const writtenWord = writtenChars.trimEnd();
      const targetWord = sentenceArray[currentWordIndex];

      // Compare the words for accuracy - points equal to correct letters
      const wordPoints = calculateWordPoints(targetWord, writtenWord);
      correctLettersPerWord.push(wordPoints);
      setCorrectLettersPerWord(correctLettersPerWord);

      // Reset textfield
      textFieldRef.current.value = "";

      // Record written word
      writtenWordArray.push(writtenWord);
      setWrittenWordArray(writtenWordArray);

      // Update array in state depending on whether the user got the word right or wrong
      if (wordPoints === targetWord.length) {
        isEachWordCorrectArray.push(true);
      } else {
        isEachWordCorrectArray.push(false);
      }
      setIsEachWordCorrectArray(isEachWordCorrectArray);

      if (currentWordIndex === sentenceArray.length - 1) {
        const totalLettersCorrect = correctLettersPerWord.reduce(
          (total, correctForWord) => {
            return total + correctForWord;
          }
        );

        const targetWordsError = correctLettersPerWord
          .map((correctLetters, index) => {
            const targetWordLength = sentenceArray[index].length;
            return Math.ceil((targetWordLength - correctLetters) / 5);
          })
          .reduce((totalWrongWords, wrongWord) => {
            return totalWrongWords + wrongWord;
          });

        console.log(targetWordsError);

        const correctWordCount = Math.floor(totalLettersCorrect) / 5;

        const timeElapsed =
          calculateInitialStopwatchTime(sentenceArray, targetWordSpeed) -
          stopwatchTime;

        console.log(correctWordCount);
        console.log(timeElapsed);

        const writtenWordSpeed =
          ((correctWordCount - targetWordsError) * 60) / timeElapsed;

        console.log(writtenWordSpeed);

        if (writtenWordSpeed < targetWordSpeed) {
          setIsFailedTyping(true);
          setDialogMessage("You failed to type the sentence correctly!");
          setIsWin(false);
        } else {
          handleDialogOpening();
          setIsWin(true);
        }

        setIsGameRunning(false);
        setIsGameOver(true);
      }
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handleDialogOpening = async () => {
    if (hasCheckedTypingPattern === true || isFailedTyping === true) {
      return null;
    }

    const userId = state.userEmail;
    const writtenSentence = writtenWordArray.reduce((sentence, word, index) => {
      let newSentence = sentence + " " + word;
      if (index !== writtenWordArray.length - 1) {
        return newSentence;
      } else {
        return newSentence + " ";
      }
    });
    const typingPattern = tdna.getTypingPattern({
      type: 0,
      text: writtenSentence,
      targetId: textFieldId,
      caseSensitive: true,
    });
    const dataClient = new Data();
    const verifyResponse = await dataClient.verifyUserTypingPattern(
      typingPattern,
      userId
    );

    if (verifyResponse === null) {
      console.log("Something went wrong");
      // Display this to the users - ask them to play again at the same typing speed
    } else {
      if (stopwatchTime <= 0 || isWin === false) {
        // Have already failed the conditions needed to win
        setDialogMessage("Ooops, you lost!");
      }

      if (verifyResponse.result === 1) {
        if (verifyResponse.high_confidence === 1) {
          setDialogMessage(
            "Nicely done! The TypingDNA authenticated that sentence as you!"
          );
        } else {
          setDialogMessage(
            "A win... but TypingDNA authentication doesn't have confidence in you!"
          );
        }
      } else {
        setIsWin(false);
        if (verifyResponse.high_confidence === 1) {
          setDialogMessage(
            "Lost! You may have typed well but TypingDNA couldn't verify you"
          );
        } else {
          setDialogMessage(
            "A narrow loss! You typed well but TypingDNA narrowly ruled you out"
          );
        }
      }
    }
    setHasCheckedTypingPattern(true);
  };

  const resetGame = () => {
    if (isWin) {
      setTargetWordSpeed(targetWordSpeed + 5);
      setIsGameOver(false);
      setIsGameRunning(false);
      setIsGameLoaded(false);
    } else {
      setIsGameOver(false);
      setIsGameRunning(false);
      dispatch({ type: "game/highscore", score: targetWordSpeed });
      setTargetWordSpeed(30);
    }
    setSentenceToCopy(defaultSentence);
    setIsGettingSentence(true);
    setWrittenWordArray([]);
    setCorrectLettersPerWord([]);
    setCurrentWordIndex(0);
    setStopwatchTime(0);
    setIsEachWordCorrectArray([]);
    setDialogMessage("");
    setHasCheckedTypingPattern(false);
    setIsWin(false);
    setIsFailedTyping(false);
    tdna.reset();
  };

  const handleExtraKeysDown = (event) => {
    if (event.key === " ") {
      resetGame();
    }
  };

  return (
    <Game
      sentenceArray={sentenceArray}
      stopwatchTime={stopwatchTime}
      currentWordIndex={currentWordIndex}
      handleChange={handleNewTextInput}
      textFieldRef={textFieldRef}
      isEachWordCorrectArray={isEachWordCorrectArray}
      targetWordSpeed={targetWordSpeed}
      isGameOver={isGameOver}
      handleCloseBackdrop={resetGame}
      handleExtraKeysDown={handleExtraKeysDown}
      onDialogOpening={handleDialogOpening}
      textFieldId={textFieldId}
      dialogMessage={dialogMessage}
      isWin={isWin}
      isFailedTyping={isFailedTyping}
      hasCheckedTypingPattern={hasCheckedTypingPattern}
    />
  );
};
