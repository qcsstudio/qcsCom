'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [students, setStudents] = useState([])
    const [userId, setUserId] = useState(null)
    const [categoryoptions,setCategoryoptions] = useState("")
    const router = useRouter()
    useEffect(() => {
        const id = localStorage.getItem("user_Id")
        setUserId(id)
        // if (id == "undefined" || !id ) {
        //   router.push("/interview")
        // }

    }, [router])
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
            <div>
                <h2>Welcome to QuantamCrafter Studio {students.fullName} </h2>
                <p>select category to start quiz</p>
                <h2 className="text-xl font-bold text-gray-800 font-unbounded">Quiz Instructions</h2>
                 <select
                name="careerOption"
                value={categoryoptions}
                onChange={handleChange}
                className="w-full font-montserrat p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select category Option </option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full-Stack"> Full Stack</option>
                <option value="UI-UX"> Ui UX</option>

              </select>
                <ul className="mt-3 text-gray-700 list-disc list-inside font-montserrat marker:text-[#F1813B]">
                    <li>Do not switch tabs or minimize the browser — the quiz will end automatically!</li>
                    <li>There are 30 questions.</li>
                    <li>Each question has a 50-second timer.</li>
                    <li>Do not refresh screen. you can't re-submit test.</li>
                    <li>Make sure you have good  internet conectivity</li>
                </ul>
            </div>



        </>
    )
}

export default page