import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <article>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        <ul>
         Screen Name: {user?.nickname}
         {/* {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]} </li>)} */}
        </ul>
      </article>
      //google article
    )
  );
};

export default Profile;
