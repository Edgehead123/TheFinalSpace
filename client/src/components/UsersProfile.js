import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UsersProfile = () => {
  const [userData, setUserData] = useState();
  const { profileId } = useParams();
  const { user, isAuthenticated } = useAuth0();

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
  return (
    <article>
      {/* {userData?.picture && <img src={userData.picture} alt={userData?.name} />} */}
      <h2>{userData.name}</h2>
      {userData.picture && <img src={userData.picture} />}
      <div>
      User: {userData?.nickname}
      </div>
      
      {/* <ul>
        {Object.keys(userData).map((objKey, i) => (
          <li key={i}>
            {objKey}: {userData[objKey]}{" "}
          </li>
        ))}
      </ul> */}
    </article>
    //google article
  );
};

export default UsersProfile;
