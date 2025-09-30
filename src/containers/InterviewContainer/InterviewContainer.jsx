"use client"
import { useContext } from 'react'
import React from 'react'

import { CandidateDataContext } from '@/context/CandidateDataContext'
import Footer from '../ServiceContainer/FooterContainer/Footer'
import Navbar from '@/components/NavbarComponent/Navbar'
import InterviewStudentForm from '@/components/InterviewComponent/InterviewSudentForm'
import InterviewQuestionContainer from '@/components/InterviewComponent/InterviewQuestionComponent'

const InterviewContainer = () => {

const {  showTest } = useContext(CandidateDataContext);

  return (  
    <div> 
        <Navbar/>
        {/* { showTest ?  <InterviewQuestionContainer/> : <InterviewStudentForm/>  } */}
        <InterviewStudentForm/>
        <Footer/>
    </div>
  )
}

export default InterviewContainer
