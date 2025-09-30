"use client";
import React, { useState, useEffect, useContext } from "react";
import { CandidateDataContext } from "@/context/CandidateDataContext";
import Link from "next/link";
import { quizData } from "@/Data/questions";


function InterviewQuestionComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const [shuffledQuiz, setShuffledQuiz] = useState([]);

  const { UpdateCandidateAPI, candidateData } = useContext(CandidateDataContext);

  useEffect(()=>{
    const filtered = quizData?.filter(
      q => q.course === candidateData?.course && q.careerOption === candidateData?.careerOption
    );    const shuffled = filtered.sort(() => Math.random() - 0.5);
    // console.log("shuffled Data : ",shuffled);
    setShuffledQuiz(shuffled);
  },[candidateData])

  // Prevent Cheating
  useEffect(() => {
    // Disable right-click
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    
    const disableDevTools = (event) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C"))
      ) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", disableDevTools);

    // Detect copy attempts
    const detectCopy = () => alert("Copying is not allowed!");
    document.addEventListener("copy", detectCopy);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableDevTools);
      document.removeEventListener("copy", detectCopy);
    };
  }, []);

  // Handle Tab Switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => prev + 1);
        setShowPopup(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // If the candidate switches tabs more than once, cancel the quiz
  useEffect(() => {
    if (tabSwitchCount > 1) {
      setShowResult(true);

      const data = {
        ...candidateData,
        score: score, 
        quiz_status: "cancelled"
      };
  
      UpdateCandidateAPI(candidateData.email, data);
  
    }
  }, [tabSwitchCount]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => setSelectedOption(option);

  const handleNextQuestion = () => {
    if (selectedOption === shuffledQuiz[currentQuestion]?.answer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);
    setTimeLeft(50);

    if (currentQuestion + 1 < shuffledQuiz?.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      console.log(candidateData);
      setShowResult(true);
      const data = {
        ...candidateData , score: score , quiz_status:"finished"
      }
      UpdateCandidateAPI(  candidateData.email,  data);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 min-h-screen flex flex-col items-center justify-center">

      {/* Popup warning for tab switching */}
      {showPopup && tabSwitchCount == 1 && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600">Warning! 🚨</h2>
            <p className="mt-2 text-gray-700">{tabSwitchCount == 1 ? "You switched tabs! Stay on this page or the quiz will be canceled.":"You switched tabs! Your Quiz is Cancelled"}</p>
            <button
              className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              Continue Quiz
            </button>
          </div>
        </div>
      )}

      {!showResult ? (
        <div className="bg-white/50 p-6 shadow-2xl rounded-2xl w-full max-w-[700px] select-none">
          {/* Question Counter */}
          <div className="text-gray-600 mb-2">
            Question {currentQuestion + 1} of {shuffledQuiz?.length}
          </div>

          <h3 className="text-lg font-semibold">{shuffledQuiz[currentQuestion]?.question}</h3>

          <p className="text-red-500 mt-2 font-bold">Time Left: {timeLeft} sec</p>

          <div className="mt-4">
            {shuffledQuiz[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`block w-full p-3 my-2 border rounded-md text-left font-medium transition-all ${selectedOption === option ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className={`mt-4 p-3 rounded-md w-full font-bold transition ${selectedOption ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            {currentQuestion + 1 < shuffledQuiz?.length ? "Next Question" : "See Results"}
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 shadow-lg rounded-lg w-96 text-center">
          <h2 className="text-2xl font-bold text-blue-700">
            {tabSwitchCount > 1 ? "Quiz Cancelled! ❌" : "Quiz Completed!"}
          </h2>
          <div className="text-lg mt-2 font-medium">
            {tabSwitchCount > 1
              ? "You switched tabs multiple times. The quiz has been canceled."
              : (((score / shuffledQuiz?.length) * 100).toFixed(2) >= 85) ?
              <div className="flex flex-col items-center">
                <p className="text-lg mt-2 font-medium">Your Score: {((score / shuffledQuiz?.length) * 100).toFixed(2) }%</p>
                <p>Congratulations you are selected for next round</p>
              </div>
              :<div>
                <p className="text-lg mt-2 font-medium">Your Score: {((score / shuffledQuiz?.length) * 100).toFixed(2) }%</p>
                <p>Thanks for your response.</p>
              </div>
            }
          </div>
          <Link href={'/'} className="flex justify-center  text-white font-bold  mt-4 py-2 text-lg bg-gradient-to-r from-purple-500 to-pink-500 "> Go to home</Link>
        </div>
      )}
    </div>
  );
}

export default InterviewQuestionComponent;
