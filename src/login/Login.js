import React, { useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Home from "../Home";
import AuthContext from "../context/AuthContext";

import LoginForm from "./LoginForm";
import DisplayNameSetup from "./DisplayNameSetup";

export default function Login() {
  const { user, setUser } = useContext(AuthContext);

    onAuthStateChanged(auth, (currentUser) => {
       setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };
  if (!user) {
    return <LoginForm />;
  }
  if(!user.displayName){
    return(<div> <div><DisplayNameSetup/></div>
    
      
    </div>)
  } if(user.displayName) {
    return (
        <div>
        <Home/>
        <div >
          <button onClick={logout} >Log Out </button>
        </div>
      </div>
    );
  }
}
