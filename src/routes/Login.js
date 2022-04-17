import React, { useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Home from "../Home";
import AuthContext from "../context/AuthContext";


import DisplayNameSetup from "../login/DisplayNameSetup";

import {Button} from 'reactstrap';

export default function Login() {
  const { user, setUser } = useContext(AuthContext);

    onAuthStateChanged(auth, (currentUser) => {
       setUser(currentUser);
  });




 
  if(!user.displayName){
    return(<div> <div><DisplayNameSetup/></div>
    
      
    </div>)
  } if(user.displayName) {\
    console.log(user);
    return (
        <div>
        <Home/>
      </div>
    );
  }
  else {
    console.log(user);
    // return <LoginForm />;
  }
}
