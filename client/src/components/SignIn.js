import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  return (
    <StyledWrapper>
      {isAuthenticated ? <StyledTitle>SIGN OUT</StyledTitle> : <StyledTitle>PLEASE SIGN IN</StyledTitle>}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          {/* <Profile /> */}
        </>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper=styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin-top: 20vh;
margin-left: 10vw;
margin-right: 10vw;
padding-top: 5vh;
padding-bottom: 5vh;
padding-left: 5vw;
padding-right: 5vw;
border: 10px purple solid;
`;

const StyledTitle=styled.h1`
color: purple;
`;

export default SignIn;
