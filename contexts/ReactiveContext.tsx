import { getAuth, signInAnonymously } from "firebase/auth";
import React, { useEffect } from "react";
import useUser from "./UserContext";

const ReactiveContext = React.createContext({});
export const ReactiveProvider = ({ children }: any) => {
  const auth = getAuth();
  const { login } = useUser();
  console.log("hello there");

  const generateAnonymousAuth = () => {
    signInAnonymously(auth)
      .then(({ user }) => {
        login({
          isAnonymous: true,
          id: user.uid,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const initializeApp = () => {
    generateAnonymousAuth();
  };

  useEffect(initializeApp, []);
  return (
    <ReactiveContext.Provider value={{}}>{children}</ReactiveContext.Provider>
  );
};
