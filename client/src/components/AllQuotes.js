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
  //   console.log("quotes", quotes);
  //choose a random index in the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  // console.log(randomIndex);
  //item is equal to index of quote as chosen by randomIndex
  const item = quotes[randomIndex];

  // console.log("item", item);
  // console.log("item", item);

  return !item ? (
    <div>loading</div>
  ) : (
    <Wrapper>
      <h1>Quote</h1>

      {/* {quotes.map((quote) => {
   return (
<MapCard key={quote.id}>
     <h2>{quote.quote}</h2>
     </MapCard>)
})} */}
      <h3>By: {item.by}</h3>
      <img src={item.image} alt={item.by} />

      <h3>Quote: {item.quote}</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid red;
  margin: 0 auto;
  width: max-content;
  padding: 0 10px;
  color: purple;
  /* fontFamily: Verdana; */
`;
const MapCard = styled.div`
  border: 2px solid green;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
  padding: 12px;
  margin-bottom: 10px;
  text-align: center;
  background-color: "#fafafa";
`;

export default AllQuotes;
