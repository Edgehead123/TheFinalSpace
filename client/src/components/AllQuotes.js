import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AllQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  // const [randArray, setRandArray] = useState([]);

  // fetch for the all quotes. function to generate 1 random quotes is in return
  useEffect(() => {
    fetch("/quotes")
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
 
  //choose a random index in the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  
  //item is equal to index of quote as chosen by randomIndex
  const item = quotes[randomIndex];

  

  return !item ? (
    <div>loading</div>
  ) : (
    <Wrapper>
  
      <h3>By: {item.by}</h3>
      <img src={item.image} alt={item.by} />
      <h1>Quote</h1>
      <h3> {item.quote}</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 75vw;
  padding: 0 10px;
  color: purple;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
`;
const MapCard = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  text-align: center;
  background-color: "#fafafa";
`;

export default AllQuotes;
