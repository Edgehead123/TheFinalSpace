import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AllQuotes from "./AllQuotes";
import { useAuth0 } from "@auth0/auth0-react";
import { CharContext } from "../CharContext";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const { setCurrentUser, isChatActive } = useContext(CharContext);
  useEffect(() => {
    if (isAuthenticated) {
      //only posts to endpoint is isAuthenticated is true... adding new user
      fetch("/user", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data.user);
          window.sessionStorage.setItem("user", JSON.stringify(data.user));
        });
    }
  }, [isAuthenticated, isChatActive]);

  return (
    <Wrapper>
      <StyledTitle>The Final Space:</StyledTitle>
      <StyledDesc>
        
        Final Space is a serialized intergalactic space saga about an astronaut
        named Gary and his adorable, planet-destroying friend, Mooncake. The
        series follows their adventures as they embark on a quest to unlock the
        mystery of "Final Space," the place where the entire universe ends.{" "}
      </StyledDesc>
      <StyledDesc>
        On Sept. 24, Final Space creator Olan Rogers shared the news on Twitter
        in a heartfelt post outlining the issue. "Five years of my life. Three
        seasons of TV. Blood, sweat, and tears... became a tax write-off for the
        network who owns Final Space," the post reads. "When the license is up
        internationally, Netflix will take it down, and then it will be gone
        forever."
      </StyledDesc>
      <StyledDesc>
       The Final Space is a place for fans to grieve and reminisce.
      </StyledDesc>
      <AllQuotes />
    </Wrapper>
  );
};

const StyledTitle = styled.h1`
  /* border: solid pink 1px; */
  width: 75vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: purple;
`;

const Wrapper = styled.div`
  /* border: solid green 2px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  div {
    /* border: 1px orange solid; */
    width: 75vw;
    text-align: center;
  }
`;

const StyledDesc = styled.div`
  /* border: solid pink 1px; */
  width: 75vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: purple;
  font-size: larger;
  font-weight: bolder;
  margin-bottom: 2vh;
`;

export default Home;
