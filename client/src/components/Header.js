import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Link to="/">Home</Link>
        <Link to="/characters">Characters</Link>
        <Link to ="/chat">Chat</Link>
        <Link to='/signin'>Log in</Link>
        <Link to="/profile">Profile</Link>
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
