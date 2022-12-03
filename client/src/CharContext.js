import React, { createContext, useState } from "react";

export const CharContext = createContext();

export const CharProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  //added currentUser in attempt to link _ID from user to username we type to enter chat
  const [currentUser, setCurrentUser] = useState(null);
  const [isChatActive, setIsChatActive] = useState(false);
  return (
    <CharContext.Provider
      value={{
        quotes,
        setQuotes,
        currentUser,
        setCurrentUser,
        isChatActive,
        setIsChatActive,
      }}
    >
      {children}
    </CharContext.Provider>
    //make context component,  wrap provider around what ou want to pass info to (app in app.js) that now has access,
  );
};
