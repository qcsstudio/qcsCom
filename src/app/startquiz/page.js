'use client'
import CategoryTab from '@/components/InterviewComponent/CategoryTab'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [students, setStudents] = useState([])

  const [userId, setUserId] = useState(null)

  useEffect(() => {

    const id = localStorage.getItem("user_Id")
    setUserId(id)
  }, [])
  console.log(userId, "userId")

  const fetchStudents = async (id) => {
    try {
      if (id) {
        const res = await fetch(`/api/candidate?id=${id}`)
        if (!res.ok) {
          throw new Error('Failed to fetch students')
        }
        const data = await res.json()
        console.log(data)
        setStudents(data.candidateData)
      }

    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  useEffect(() => {
    fetchStudents(userId)
  }, [userId])
  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Students List</h1>

        {students ? (
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Profile</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-medium text-gray-900">{students.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-900">{students.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading students data...</p>
        )}
      </div>
      <CategoryTab />

    </>
  )
}

export default Page
