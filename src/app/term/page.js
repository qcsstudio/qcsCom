import Navbar from '@/components/NavbarComponent/Navbar';
import PolicyContainer from '@/containers/Policy/PolicyContainer';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading policy...</div>}>
        <PolicyContainer />
      </Suspense>
    </>
  );
};

export default page;
