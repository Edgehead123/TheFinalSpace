import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [friends, setFriends] = useState([]);
  const currentUser = JSON.parse(window.sessionStorage.getItem("user"));

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/user/get-friends/${currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          setFriends(data.data);
        });
    }
  }, []);

  const removeFriendHandler = () => {
    fetch(`/user/add-friend/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //user trying to be added as friend, from body
      // body: JSON.stringify({
      //   friendId: profileId,
      // }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.alert("friend removed !");
        }
      });
  };

  // console.log("friends", friends);
  return (
    isAuthenticated && (
      <StyledArticle>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h1>{user?.name}</h1>
        <ul>
          User Name: {user?.nickname}
          {/* {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]} </li>)} */}
        </ul>
        {friends.length >0 ? <h3>Friends</h3> : <div></div>}
        {friends &&
          friends.map((friend, i) => {
            return (
              <li key={i}>
                {/* TODO add more stuff */}
                <p >{friend.name}</p>
                <button onClick={removeFriendHandler}>Remove friend</button>
              </li>
            );
          })}
        <SignIn />
      </StyledArticle>
      //google article
    )
  );
};

const StyledArticle = styled.article`
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
  h3 {
    color: purple;
  }
  ul {
    color: purple;
  }
  p {
    color: purple;
  }
`;

export default Profile;
