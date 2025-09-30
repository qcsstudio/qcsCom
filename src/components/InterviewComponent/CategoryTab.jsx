'use client'
import React, { useState, useEffect } from 'react'

const CategoryTab = () => {
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})
  const [checkedQuestions, setCheckedQuestions] = useState([])
  const [quizCatId, setQuizCatId] = useState(null)
  const [page, setpage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const [level, setLevel] = useState("Basic")
    const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); 
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
      console.log(pageParam,"pagepagepage")
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

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }))
  }

  const handleNext = () => {
      const next = page + 1;
    if (page < totalPages && quizCatId) {
      setpage(next)
      fetchQuestions(quizCatId,next)
    }
  }

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(60); // reset to 1 minute
    setSelectedOptions({});
  };
    useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft]);


  return (
    <div className=" border-t pt-10">
      {/* Categories Tabs */}
      <div className="flex justify-center mb-6">
        <ul className="flex gap-4 flex-wrap">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-[#f1650e] font-montserrat font-semibold bg-[#F1813B] text-white"
              onClick={() => fetchQuestions(cat._id)}
            >
              {cat.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Questions */}
      <div className="w-[90%] mx-auto space-y-6">
        {questions?.length > 0 ? (
          <>
            {/* Timer + Start */}
            {!quizStarted ? (
              <div className="flex justify-center mb-4">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Start Quiz
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">
                  {page}/{totalPages}
                </h4>
                <span
                  className={`px-4 py-2 rounded-lg font-bold ${
                    timeLeft > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {timeLeft > 0 ? `Time Left: ${timeLeft}s` : "Time's Up!"}
                </span>
              </div>
            )}

            {questions.map((q, qIdx) => (
              <div
                key={q._id}
                className={`bg-white p-4 rounded-lg shadow-sm border ${
                  timeLeft <= 0 ? "opacity-50" : ""
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
                        onChange={() => handleOptionChange(q._id, opt.option_id)}
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
            <p className="text-gray-600 text-lg font-medium bg-gray-100 px-6 py-3 rounded-lg shadow-sm border">
              Please choose a category to start quiz
            </p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {questions.length > 0 && quizStarted && (
        <div className="w-[90%] mx-auto mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={timeLeft <= 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryTab
