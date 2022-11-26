import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AllQuotes from "./AllQuotes";

const Home = () => {
    const [quotes, setQuotes] = useState(null);
  

return (
    //!quotes? <div>loading</div>:
    <Wrapper>
        <div>Home</div>
        <div>The Final Space:</div>
        <div> desc </div>

        <AllQuotes />
    </Wrapper>
);

}  

const Wrapper = styled.div`
`;

export default Home;