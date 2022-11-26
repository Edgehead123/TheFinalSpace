import React, { createContext, useState } from "react";

export const CharContext = createContext();

export const CharProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  return (
    <CharContext.Provider value={{ quotes, setQuotes }}>
      {children}
    </CharContext.Provider>
    //make context component,  wrap provider around what ou want to pass info to (app in app.js) that now has access,  
  );
};
