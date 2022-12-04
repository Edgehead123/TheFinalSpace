import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CharContext } from "../CharContext";

const Character = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [allQuotes, setAllQuotes] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

// context to load the character specific quotes
  const { quotes } = useContext(CharContext);
// fetch for the all quotes. function to generate 1 random quotes is in return
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


  if (character && allQuotes.length === 0) {
    const test = quotes.filter((char) => char.by === character.name);
    if (test.length > 0) {
      // console.log("test", test);
      setAllQuotes(test);
    }
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
      <h1>Character:</h1>
      <img src={character.img_url} alt={character.name} />
      <div>Name: {character.name}</div>
      <div>Status: {character.status}</div>
      <div>Species: {character.species}</div>
      <div>Gender: {character.gender}</div>
      <div>Origin: {character.origin}</div>
      {/* <div>ID: {character.id}</div> */}

      {/* quote specific to that character */}
      {allQuotes.length > 0 && (
        <CharCard>
          {/* .length prevents bug where quote info would only render after a change on the page (*/}

          <h1>Quote:</h1>
          <h3>{allQuotes[quoteIndex].quote}</h3>
        </CharCard>
      )}

      <button onClick={nextHandler}>Next Quote</button>
    </Wrapper>
  );
};

const CharCard = styled.div`
  /* border: 2px solid red; */
  margin: 0 auto;
  width: 48vw;
  color: purple;
  justify-content: center;
  text-align: center;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
  padding: 5px;
  
`;

const Wrapper = styled.div`
  /* border: 2px solid red; */
  margin: 0 auto;
  width: 50vw;
  color: purple;
  justify-content: center;
  text-align: center;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
  padding: 5px;
  div{
    font-size: larger;
  }
`;
const MapCard = styled.div`
  /* border: 2px solid green; */
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
  padding: 12px;
  margin-bottom: 10px;
  text-align: center;
  background-color: "#fafafa";
  font-size: larger;
  font-weight: bolder;
`;

export default Character;
