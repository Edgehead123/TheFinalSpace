import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CharContext } from "../CharContext";

const CharQuotes = () => {
  const { quotes } = useContext(CharContext);
  // const [randArray, setRandArray] = useState([]);

  // fetch for the all quotes. function to generate 1 random quotes is in return

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

      <h3>By: {item.by}</h3>
      <img src={item.image} alt={item.by} />

      <h3>{item.quote}</h3>
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

export default CharQuotes;
