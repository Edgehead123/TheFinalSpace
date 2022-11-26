import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  return (
    <Wrapper>
      <Container>
        <Link to="/">Home</Link>
        <Link to="/characters">Characters</Link>
        { isAuthenticated ? <Link to ="/chat">Chat</Link> : <Link to='/signin'>Chat</Link>}
        {isAuthenticated ? <Link to='/signin'>Log out</Link> : <Link to='/signin'>Log in</Link>}
        { isAuthenticated ? <Link to="/profile">Profile</Link> : <Link to='/signin'>Profile</Link> }
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
/* border: 3px blue solid; */
  display: flex;
  flex-direction: row;
  width: 95vw;
  justify-content: space-between;
  background-color: red;
  div{
    background-color: yellow;
  }
 
`;

const Wrapper = styled.header`
/* border: 3px red solid; */
  display: flex;
  justify-content: space-around;
  height: 5vh;
  background-color: yellow;
`;
export default Header;
