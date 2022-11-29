import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AllQuotes from "./AllQuotes";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
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
      });
    }
  }, [isAuthenticated]);

  return (
    <Wrapper>
      <div>Home</div>
      <div>The Final Space:</div>
      <div> desc </div>

      <AllQuotes />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Home;
