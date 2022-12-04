import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AllCharacters = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState(null);
  // fetch for the all quotes. function to generate 1 random quotes is in return
  useEffect(() => {
    //limits to 11 of the characters
    fetch("/character/?limit=11")
      .then((res) => res.json())
      .then((data) => {
        //   setQuotes(data));
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setCharacters(data);
        }
      })
      .catch((error) => {
        window.alert(error);
        // console.log(error);
      });
  }, []);

  // console.log("characters", characters);
  return !characters ? (
    <div>loading</div>
  ) : (
    <Wrapper>
      <h1>MAIN CHARACTERS</h1>
      {characters.map((character) => {
        return (
          <MapCard key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <img src={character.img_url} alt={character.name} />
            </Link>
            <p>{character.name}</p>
          </MapCard>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 2px solid red; */
  margin: 0 auto;
  width: max-content;
  padding: 0 10px;
  color: purple;
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

export default AllCharacters;
