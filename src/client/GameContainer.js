import React, { useEffect, useRef, useState } from "react";

import { Data } from "../data/Data";
import { Game } from "./Game";

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

export const GameContainer = () => {
  const [sentenceToCopy, setSentenceToCopy] = useState(defaultSentence);
  const [isGettingSentence, setIsGettingSentence] = useState(true);
  const [currentWordSpeed, setCurrentWordSpeed] = useState(30);

  useEffect(() => {
    const getSentence = async () => {
      const dataClient = new Data();
      const newSentence = await dataClient.getSentence();
      if (newSentence !== null) {
        setSentenceToCopy(newSentence);
        setIsGettingSentence(false);
      } else {
        return defaultSentence;
      }
    };

    if (sentenceToCopy === defaultSentence) {
      getSentence();
    }
  }, [sentenceToCopy]);

  const textFieldRef = useRef();

  const sentenceArray = sentenceToCopy.split(" ");

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [correctLettersPerWord, setCorrectLettersPerWord] = useState([]);
  const [writtenWordArray, setWrittenWordArray] = useState([]);

  const [isEachWordCorrectArray, setIsEachWordCorrectArray] = useState([]);

  const handleNewTextInput = (event) => {
    const writtenChars = event.target.value;
    const lastChar = writtenChars[writtenChars.length - 1];

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
        // Now we want to calculate the number of words typed successfully
        const totalLettersCorrect = correctLettersPerWord.reduce(
          (total, correctForWord) => {
            return total + correctForWord;
          }
        );

        const targetWordsError =
          5 *
          correctLettersPerWord
            .map((correctLetters, index) => {
              const targetWordLength = sentenceArray[index].length;
              return Math.ceil((targetWordLength - correctLetters) % 5);
            })
            .reduce((totalWrongWords, wrongWord) => {
              return totalWrongWords + wrongWord;
            });

        const correctWordCount =
          Math.floor(totalLettersCorrect) - targetWordsError;

        // We have to use the time on the stopwatch to calculate the
      }
      // Set new current word target
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  console.log(correctLettersPerWord);

  return (
    <Game
      sentenceArray={sentenceArray}
      stopwatchTime={stopwatchTime}
      currentWordIndex={currentWordIndex}
      handleChange={handleNewTextInput}
      textFieldRef={textFieldRef}
      isGettingSentence={isGettingSentence}
      isEachWordCorrectArray={isEachWordCorrectArray}
    />
  );
};
