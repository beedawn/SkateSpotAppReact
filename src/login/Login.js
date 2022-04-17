import React, { useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Home from "../Home";
import AuthContext from "../context/AuthContext";
import loading from "../images/Loading_icon.gif"

import LoginForm from "./LoginForm";
import DisplayNameSetup from "./DisplayNameSetup";

export default function Login() {
  

  const { user, setUser } = useContext(AuthContext);

    onAuthStateChanged(auth, (currentUser) => {
       setUser(currentUser);
  });




  if(user===null) {
    console.log(user)
    return <LoginForm />;
     
   }
  if(user.displayName) {
    
    return (
        <div>
        <Home/>
      </div>
    );
  }
if(user.displayName===null){
    console.log(user.displayName)
    return(<div> <div><DisplayNameSetup/></div>
    
      
    </div>)
     }
else{return(
  <div><img src={loading}  alt="Loading" /></div>
)}
}
