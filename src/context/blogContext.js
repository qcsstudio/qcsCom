'use client';

import { createContext, useState } from "react";


export const blogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [blogData, setBlogData] = useState([]);

  return (
    <blogContext.Provider value={{ blogData, setBlogData }}>
      {children}
    </blogContext.Provider>
  );
};
