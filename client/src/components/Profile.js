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
        <h3>Friends</h3>
        {friends &&
          friends.map((friend) => {
            return (
              <>
                {/* TODO add more stuff */}
                <p>{friend.name}</p>
              </>
            );
          })}
          <SignIn />
      </StyledArticle>
      //google article
    )
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
