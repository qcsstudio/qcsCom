import React from 'react'
import { Unbounded } from 'next/font/google'

const unbounded = Unbounded({ subsets: ['latin'], weight: '700' })
const Heading = ({heading}) => {
  return (
    <>
    <h3 className={`lg:text-[40px] sm:text-4xl text-3xl text-center  ${unbounded.className}  my-9 sm:my-11 `}>{heading}</h3>
    </>
  )
}

export default Heading