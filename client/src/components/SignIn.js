import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  return (
    <main>
      <h1>Auth0 Login</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          <Profile />
        </>
      )}
    </main>
  );
};

export default SignIn;
