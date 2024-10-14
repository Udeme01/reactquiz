import { useState } from "react";

import QuestionTimer from "../components/QuestionTimer";
import Answers from "./Answers";
import questions from "../questions";

const Question = ({ index, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (useranswer) => {
    setAnswer({
      selectedAnswer: useranswer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: useranswer,
        isCorrect: questions[index].answers[0] === useranswer,
      });
      setTimeout(() => {
        onSelectAnswer(useranswer);
      }, 2000);
    }, 1000);
  };

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        interval={100}
        mode={answerState}
      />
      <h2>{questions[index].text}</h2>
      <Answers
        answers={questions[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
