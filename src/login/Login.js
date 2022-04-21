import React, { useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Home from "../HomeRouter";
import AuthContext from "../context/AuthContext";
import loading from "../images/Loading_icon.gif";

import LoginForm from "./LoginForm";
import DisplayNameSetup from "./DisplayNameSetup";

export default function Login() {
  const { user, setUser } = useContext(AuthContext);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  if (user === null) {
    //returns Login Form to prompt user to sign in, checks if user is null if you use !user to check the logic breaks
    return <LoginForm />;
  }
  if (user.displayName) {
    //Takes user to Dashboard
    return (
      <div>
        <Home />
      </div>
    );
  }
  if (user.displayName === null) {
    //Asks user to set up display name, then moves them to Dashboard once completed.
    return (
      <div>
        {" "}
        <div>
          <DisplayNameSetup />
        </div>
      </div>
    );
  } else {
    //returns loading animation
    return (
      <div>
        <img src={loading} alt="Loading" />
      </div>
    );
  }
}
