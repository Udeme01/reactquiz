import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout, interval, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const quizTimer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(quizTimer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const quizInterval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - interval);
    }, interval);

    return () => {
      clearInterval(quizInterval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
};

export default QuestionTimer;
