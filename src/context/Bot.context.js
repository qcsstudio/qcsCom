"use client"
import { createContext, useState } from "react";

const botContext = createContext();

export const BotProvider = ({ children }) => {

    const [botActivate,setBotActivate] = useState(false);

  return <>
  
  <botContext.Provider value={{botActivate,setBotActivate}} >
    {children}
  </botContext.Provider>

  </>;
};

export {botContext};
