import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [user, setUser] = useState("");
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
