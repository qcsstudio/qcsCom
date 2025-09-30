'use client'
import CategoryTab from '@/components/InterviewComponent/CategoryTab'
import Navbar from '@/components/NavbarComponent/Navbar'
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
    <Navbar/>
    


      <div className='flex '>
        {/* student detail---------- */}
        <div className='lg:w-[25%] xl:w-[20%] h-screen border-r'>
          <div className="">
        {students ? (
        <div className="p-6 w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-unbounded">Student Profile</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-lg text-gray-500 font-unbounded">Full Name</p>
              <p className="text-base font-medium text-gray-900 font-montserrat">{students.fullName}</p>
            </div>

            <div>
              <p className="text-lg text-gray-500 font-unbounded">Email</p>
              <p className="text-base font-medium text-gray-900 font-montserrat">{students.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading students data...</p>
      )}
      </div>
        </div>

        {/* questions section------------ */}
        <div className='w-full '>
          
          <CategoryTab/>
        </div>

      </div>
      

    </>
  )
}

export default Page
