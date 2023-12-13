// ExamSimulator.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ExamSimulator.css';

/**
 * ExamSimulator component.
 * This component displays a set of exam questions and a 15-minute timer.
 * When the time is up, it shows the score and offers an option to become a premium user.
 */
function ExamSimulator() {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(15 * 60); // 15 minutes in seconds
  const [examFinished, setExamFinished] = useState(false);

  // Function to load exam questions from the backend
  const loadQuestions = async () => {
    try {
      const response = await axios.get('https://be-mex.com/api/exam-questions');
      // const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/exam-questions`);
      setQuestions(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error loading questions:', error);
    }
  };

  // Load questions on component mount
  useEffect(() => {
    loadQuestions();
  }, []);

  // Timer logic
  // eslint-disable-next-line
  useEffect(() => {
    if (timer > 0 && !examFinished) {
      const intervalId = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } if (timer === 0 && !examFinished) {
      setExamFinished(true);
    }
  }, [timer, examFinished]);

  // Function to restart the exam
  const restartExam = () => {
    loadQuestions();
    setSelectedOptions({});
    setTimer(15 * 60);
    setExamFinished(false);
  };

  // Function to handle option selection
  const handleOptionSelect = (questionId, option) => {
    if (!examFinished) {
      setSelectedOptions({ ...selectedOptions, [questionId]: option });
    }
  };

  // Function to finish the exam
  const finishExam = () => {
    setExamFinished(true);
  };

  // Function to calculate the user's score
  const calculateScore = () => {
    const correctAnswers = questions.reduce((total, question) =>
      total + (selectedOptions[question.id] === question.answer_text ? 1 : 0), 0);
    return Math.round((correctAnswers / questions.length) * 100); // Score out of 100
  };

  // Function to get CSS class for each option
  const getClassForOption = (question, option) => {
    if (examFinished) {
      if (option === question.answer_text) {
        return 'option correct';
      } if (option === selectedOptions[question.id]) {
        return 'option incorrect';
      }
    }
    return selectedOptions[question.id] === option ? 'option selected' : 'option';
  };

  // Function to render questions and options
  const renderQuestions = () => questions.map((question) => (
    <div key={question.id} className="question-item">
      <h4>{question.question_text}</h4>
      {question.options.map((option) => (
        <button
          key={option}
          disabled={examFinished || selectedOptions[question.id]}
          className={getClassForOption(question, option)}
          onClick={() => handleOptionSelect(question.id, option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  ));

  // Function to render the timer
  const renderTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Function to render exam results
  const renderResults = () => {
    const finalScore = calculateScore();
    const scoreColorClass = finalScore >= 80 ? 'score-high' : 'score-low';
    return (
      <h2 className={scoreColorClass}>
        Your score:
        {finalScore}
        /100
      </h2>
    );
  };

  return (
    <div className="exam-simulator">
      <h2>Exam Simulator</h2>
      <div className="timer">
        {examFinished ? <span>Time&apos;s Up!</span> : renderTimer()}
      </div>
      <div className="questions-container">
        {renderQuestions()}
      </div>
      {!examFinished && (
        <button onClick={finishExam} className="finish-exam-btn" type="button">Finish</button>
      )}
      <button onClick={restartExam} className="restart-exam-btn" type="button">Restart</button>
      {examFinished && renderResults()}
      <button onClick={() => { /* Logic to go to premium user page */ }} className="premium-offer-btn" type="button">
        Want to be a premium user and save your results?
      </button>
    </div>
  );
}

export default ExamSimulator;
