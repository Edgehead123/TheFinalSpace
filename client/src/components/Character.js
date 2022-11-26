import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CharContext } from "../CharContext";

const Character = () => {
  //
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  //tryng to make a context to load the character specific quotes
  const [allQuotes, setAllQuotes] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  // fetch for the all quotes. function to generate 1 random quotes is in return

  const { quotes } = useContext(CharContext);

  useEffect(() => {
    fetch(`/characters/${characterId}`)
      //params with id
      .then((res) => res.json())
      .then((data) => {
        //   setQuotes(data));
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setCharacter(data);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }, []);
{//just comments
  // console.log("char", character);
  //there is data
  // console.log("quotes", quotes);
  //there is data
  // console.log("char", character.name);
  //there is data
}

  if (character && allQuotes.length === 0) {
    const test = quotes.filter((char) => char.by === character.name);
    if (test.length > 0) {
      // console.log("test", test);
      setAllQuotes(test);
    }
  }
  
  {//just comments
    //   ideas to cross reference quotes:
    //   1 .. by in quote = id in characters. could work with params b/c involves the id
    //  2 .. name in characters = by in quote
    //  filter method. filter quotes via  by=character.name?
    // console.log("allquotes",allQuotes);
    //there is data
  }
  
  const nextHandler = () => {
    if (quoteIndex === allQuotes.length - 1) {
      setQuoteIndex(0);
    } else {
      setQuoteIndex(quoteIndex + 1);
    }
  };

  return !character ? (
    <div>loading</div>
  ) : (
    <Wrapper>
      <h1>All Characters</h1>
      <img src={character.img_url} alt={character.name} />
      <div>Name: {character.name}</div>
      <div>Status: {character.status}</div>
      <div>Species: {character.species}</div>
      <div>Gender: {character.gender}</div>
      <div>Origin: {character.origin}</div>
      <div>ID: {character.id}</div>
      <h1>Quote placeholder</h1>
      
      {/* quote specific to that character */}
       {allQuotes.length > 0 && ( 
        <CharCard>
          {/* .length prevents bug where quote info would only render after a change on the page (*/}
          <h1>Quote</h1>
          <h3>By:{allQuotes[quoteIndex].by}</h3>
          <img
            src={allQuotes[quoteIndex].image}
            alt={allQuotes[quoteIndex].by}
          />
          <h3>{allQuotes[quoteIndex].quote}</h3>
        </CharCard>
      )}

      <button onClick={nextHandler}>Next Quote</button>
    </Wrapper>
  );
};

const CharCard = styled.div`
  border: 2px solid red;
  margin: 0 auto;
  width: max-content;
  padding: 0 10px;
  color: purple;
  /* fontFamily: Verdana; */
`;

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
  font-size: larger;
  font-weight: bolder;
`;

export default Character;
