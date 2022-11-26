import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import Header from "./Header";
import Home from "./Home";

import AllCharacters from "./AllCharacters";
import Profile from "./Profile";
import Character from "./Character";
import { useContext, useEffect, useState } from "react";
import { CharContext } from "../CharContext";

import SignIn from "./SignIn";
import Chat from "./Chat";

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const { setQuotes } = useContext(CharContext);

  useEffect(() => {
    fetch("/quotes/")
      .then((res) => res.json())
      .then((data) => {
        //   setQuotes(data));
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setQuotes(data);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }, []);
  //put fetch here so that context can pass info to charQuotes
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<AllCharacters />} />
        <Route path="/characters/:characterId" element={<Character />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
