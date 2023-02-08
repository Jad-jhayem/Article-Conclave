import React, { useState, useContext } from "react";

const logInContext = React.createContext();

export const LogInContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  //

  return (
    <logInContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        userName,
        setUserName,
      }}
    >
      {children}
    </logInContext.Provider>
  );
};

export const useLogIn = () => {
  const context = useContext(logInContext);

  if (context === undefined) {
    throw new Error("useLogIn must be within logInContextProvider");
  }
  const {
    isLoggedIn,
    setIsLoggedIn,
    userEmail,
    setUserEmail,
    userName,
    setUserName,
  } = context;
  return {
    isLoggedIn,
    setIsLoggedIn,
    userEmail,
    setUserEmail,
    userName,
    setUserName,
  };
};
