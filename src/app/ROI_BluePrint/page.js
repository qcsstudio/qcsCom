import RoiBluePrint from '@/components/RoiBluePrint/RoiBluePrint'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <>
    <Suspense>
        <RoiBluePrint/>
    </Suspense>
    </>
  )
}

export default page