import React, { useState } from "react";
import { Provider } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};

export const AuthContextProvider = (props) => {
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(localToken);

  const userIsLoggedIn = !!token;

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    const timer = calculateRemainingTime(expirationTime);
    setTimeout(() => {
      logOutHandler();
    }, timer);
    localStorage.setItem("token", token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
