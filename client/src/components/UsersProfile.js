import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UsersProfile = () => {
  const [userData, setUserData] = useState();
  const { profileId } = useParams();

  const { user, isAuthenticated } = useAuth0();

  const currentUser = JSON.parse(window.sessionStorage.getItem("user"));

  useEffect(() => {
    fetch(`/user/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        // console.log("users", data.data);
      });
  }, []);

  if (!userData) {
    return <h2>Loading ...</h2>;
  }

  const addFriendHanlder = () => {
    fetch(`/user/add-friend/${currentUser._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //user trying to be added as friend, from body
      body: JSON.stringify({
        friendId: profileId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.alert("friend added !");
        }
      });
  };


  
  return (
    <StyledArticle>
      {/* {userData?.picture && <img src={userData.picture} alt={userData?.name} />} */}
      <h1>{userData.name}</h1>
      {userData.picture && <img src={userData.picture} />}
      <div>User: {userData?.nickname}</div>

      <button onClick={addFriendHanlder}>Add Friend</button>
      <button onClick={addFriendHanlder}>Remove Friend</button>

      {/* <ul>
        {Object.keys(userData).map((objKey, i) => (
          <li key={i}>
            {objKey}: {userData[objKey]}{" "}
          </li>
        ))}
      </ul> */}
    </StyledArticle>
    //google article
  );
};

const StyledArticle=styled.article`
/* border: 1px green solid; */
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-top: 10vh;
img {
  width: 5vw;
}
h1 {
  color: purple;
}
div {
  color: purple;
}

`;

export default UsersProfile;
