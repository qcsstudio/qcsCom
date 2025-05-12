import Navbar from '@/components/NavbarComponent/Navbar';
import PolicyContainer from '@/containers/Policy/PolicyContainer';
import { sections } from '@/containers/Policy/PolicyData';
import React from 'react';

const page = () => {
  return (
  <>
  <Navbar/>
  <PolicyContainer />
  </>
  )
};

export default page;
