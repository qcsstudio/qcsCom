'use client'
import React, { useState, useEffect } from 'react'

const CategoryTab = () => {
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({}) // track selected checkboxes
  const [level,setLevel] = useState("Basic")

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/quiz-category/list`)
      const data = await res.json()
      setCategories(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Fetch questions for a category
  const fetchQuestions = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/quiz-question/list?id=${id}`)
      const data = await res.json()
      setQuestions(data.data)
      setSelectedOptions({}) // reset selected options on new category
    } catch (error) {
      console.log(error)
    }
  }

  // Handle checkbox selection
  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }))
  }

  // Handle submit
  const handleSubmit = () => {
    const submission = questions.map(q => ({
      question_id: q._id,
      selected_option: selectedOptions[q._id] || null
    }))
    console.log("Submission Data:", submission)
    // Aap yahan API call bhi kar sakte ho to save answers
    // fetch('/api/submit-answers', { method: 'POST', body: JSON.stringify(submission) })
    alert("Check console for submission data!")
  }

  return (
    <div className="p-6">
      {/* Categories Tabs */}
      <div className="flex justify-center mb-6">
        <ul className="flex gap-4 flex-wrap">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => fetchQuestions(cat._id)}
            >
              {cat.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Questions */}
      <div className="w-[90%] mx-auto space-y-6">
        {questions.map((q, qIdx) => (
          <div key={q._id} className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">
              <span className="mr-2 text-gray-500">{qIdx + 1}.</span>
              {q.question_text}
            </h3>

            {/* Options */}
            <ul className="space-y-2">
              {q.options.map((opt) => (
                <li key={opt._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions[q._id] === opt.option_id}
                    onChange={() => handleOptionChange(q._id, opt.option_id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>{opt.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {questions.length > 0 && (
        <div className="w-[90%] mx-auto mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryTab
