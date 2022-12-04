import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  return (
    <Wrapper>
      <Container>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/characters">CHARACTERS</NavLink>
        {isAuthenticated ? (
          <NavLink to="/chathome">CHAT</NavLink>
        ) : (
          <NavLink to="/signin">CHAT</NavLink>
        )}
        {isAuthenticated ? (
          <NavLink to="/signin">LOG OUT</NavLink>
        ) : (
          <NavLink to="/signin">LOG IN</NavLink>
        )}
        {isAuthenticated ? (
          <NavLink to="/profile">PROFILE</NavLink>
        ) : (
          <NavLink to="/signin">PROFILE</NavLink>
        )}
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  border: 3px purple solid;
  display: flex;
  flex-direction: row;
  width: 85vw;
  justify-content: space-between;
  background-color: red;
  align-items: center;
  padding-bottom: 5px;
  padding-left: 2vw;
  padding-right: 2vw;
  border-radius: 5px;
  a:link{
    border-radius: 5px;
    text-decoration: none;
    
    padding: 2px;
    background-color: yellow;
  }
  a:visited{
    border-radius: 5px;
    text-decoration: none;
    
    padding: 2px;
    background-color: yellow;
  }
  a:hover{
    border-radius: 5px;
    text-decoration: none;
    padding: 2px;
    background-color: yellow;
    
  }
`;

const Wrapper = styled.header`
  border: 3px purple solid;
  display: flex;
  justify-content: space-around;
  height: 5vh;
  background-color: yellow;
  border-radius: 5px;
`;

export default Header;
