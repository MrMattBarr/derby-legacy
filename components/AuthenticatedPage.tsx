import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

const AuthenticatedPage = () => {
  return <div>Logged In</div>;
};

const WrappedPage = () => {
  return (
    <Auth0Provider
      domain="dev-7ke2yhzw.us.auth0.com"
      clientId="xVnRXPGsviqMI9JoVBpKyZcdF5IlJxSD"
      redirectUri={"http://localhost:19006/authenticated"}
    >
      <AuthenticatedPage />
    </Auth0Provider>
  );
};

export default WrappedPage;
