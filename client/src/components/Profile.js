import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

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

  console.log("friends", friends);
  return (
    isAuthenticated && (
      <article>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        <ul>
          Screen Name: {user?.nickname}
          {/* {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]} </li>)} */}
        </ul>
        <div>Fiends</div>
        {friends &&
          friends.map((friend) => {
            return (
              <>
                {/* TODO add more stuff */}
                <p>{friend.name}</p>
              </>
            );
          })}
      </article>
      //google article
    )
  );
};

export default Profile;
