'use client'
import React, { useState, useEffect } from 'react'

const CategoryTab = ({ setActivecategory, activecategory }) => {
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [checkedQuestions, setCheckedQuestions] = useState([])
  const [quizCatId, setQuizCatId] = useState(null)
  const [page, setpage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizEnded, setQuizEnded] = useState(false);
  const candidateId = localStorage.getItem("user_Id")
  const [popup, setPopup] = useState(false)

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/quiz-category/list`)
      const data = await res.json()
      setCategories(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchQuestions = async (id, pageParam = page) => {
    try {
      console.log(pageParam, "pagepagepage")
      console.log(pageParam, "pagepagepage")
      const res = await fetch(`/api/quiz-question/list?id=${id}&page=${pageParam}`)
      const data = await res.json()
      setQuestions(data.data)
      setTotalPages(data?.totalPage)
      setQuizCatId(id)
      setSelectedOptions({})
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeOption = (questionId, optionId, opt) => {
    console.log(opt, ":opt")
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId,
      is_correct: opt?.is_correct,
      selected_option: opt?.option_id,
      question_id: optionId
    }))

    let obj = {
      [questionId]: questionId,
      is_correct: opt?.is_correct,
      selected_option: opt?.option_id,
      question_id: questionId
    }

    setCheckedQuestions((pre) => ([...pre, obj]))
  }

  console.log(checkedQuestions, "checkedQuestionscheckedQuestionscheckedQuestions")
  const handleNext = () => {
    const next = page + 1;
    if (page < totalPages && quizCatId) {
      setpage(next)
      fetchQuestions(quizCatId, next)
    }
  }

  const handleSubmitQuiz = async () => {
    try {
      const newObj = {
        candidate_id: candidateId,
        category_id: quizCatId,
        answers: checkedQuestions
      }
      console.log(newObj, "newObjnewObjnewObj")
      if (newObj?.answers?.length > 2) {
        const res = await fetch("/api/quiz-result", {
          method: "POST",
          body: JSON.stringify(newObj)
        })
        console.log(res, "resresres")
      }
      setPopup(true)
    } catch (error) {
      console.log("submit quiz: ", error)
    }
  }

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(60);
    setSelectedOptions({});
  };
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizEnded) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      setQuizEnded(true);
    }
  }, [quizStarted, timeLeft, quizEnded]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && quizStarted && !quizEnded) {
        setQuizEnded(true);
        alert("You switched tabs! Quiz ended.");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [quizStarted, quizEnded]);

  const afterSubmit = () => {
    setQuestions([])
      setTotalPages(0)
      setQuizCatId(null)
      setSelectedOptions({})
       setPopup(false)
  }

  return (
    <>

      <div className=" border-t pt-10">
        <div className="flex justify-center mb-6">
          <ul className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className={`px-4 py-2 border rounded-lg cursor-pointer font-montserrat font-semibold bg-[#F1813B] hover:bg-[#f1650e] text-white
   
    ${quizStarted ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (!quizStarted) {   // ❌ agar quiz start ho gaya hai to category change mat hone do
                    fetchQuestions(cat._id)
                    setActivecategory(cat.title)
                  }
                }}
              >
                {cat.title}
              </li>

            ))}
          </ul>
        </div>
        <div className="w-[90%] mx-auto mb-4">
          <p className="text-center text-red-700 font-bold bg-red-100 border border-red-300 px-6 py-3 rounded-lg shadow-md">
            ⚠️ Do not switch tabs or minimize the browser — the quiz will end automatically!
          </p>
        </div>
        {questions?.length > 0 && <div className='w-[90%] mx-auto'>
          {!quizStarted ? (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleStartQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-montserrat"
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium ">
                <strong>Page: </strong> {page}/{totalPages}
              </h4>
              <span
                className={`px-4 py-2 rounded-lg font-bold ${timeLeft > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {timeLeft > 0 ? `Time Left: ${timeLeft}s` : "Time's Up!"}
              </span>

            </div>
          )}
        </div>

        }

        <div className="w-[90%] mx-auto space-y-6 md:h-[400px] lg:h-[450px] xl:h-[550px] overflow-y-auto no-scrollbar">


          {questions?.length > 0 ? (
            <>

              {/* Questions ----------- */}
              {questions.map((q, qIdx) => (
                <div
                  key={q._id}
                  className={`bg-white p-4 rounded-lg shadow-sm border ${timeLeft <= 0 ? "opacity-50" : ""
                    }`}
                >
                  <h3 className="text-lg mb-3 font-unbounded">
                    <span className="mr-2 text-gray-500">{qIdx + 1}.</span>
                    {q.question_text}
                  </h3>

                  {/* Options */}
                  <ul className="space-y-2">
                    {q.options.map((opt) => (
                      <li key={opt._id} className="flex items-center gap-2 font-montserrat">
                        <input
                          type="checkbox"
                          checked={selectedOptions[q._id] === opt.option_id}
                          onChange={() => handleChangeOption(q._id, opt.option_id, opt)}
                          disabled={!quizStarted || timeLeft <= 0}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span>{opt.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center py-10">
              <p className="text-gray-600 text-lg font-medium bg-gray-100 px-6 py-3 rounded-lg shadow-sm border font-montserrat">
                Please choose a category to start quiz
              </p>
            </div>
          )}
        </div>

        {questions.length > 0 && quizStarted && (

          <div className="w-[90%] mx-auto mt-6 flex justify-start font-montserrat">
            {
              page === totalPages ? <button
                onClick={handleSubmitQuiz}
                disabled={timeLeft <= 0}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                Submit
              </button> : <button
                onClick={handleNext}
                disabled={timeLeft <= 0}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                Next
              </button>
            }
          </div>
        )}
      </div>
      {/* Popup Modal */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="mb-6">Your quiz has been submitted successfully.</p>
            <button
              onClick={() =>{ 
                setPopup(false)
              window.location.reload() 
            }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </>
  )
}

export default CategoryTab
