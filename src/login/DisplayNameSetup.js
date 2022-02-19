import React, { useContext, useState, useEffect } from "react";
import { styles } from "./Styles";
import { auth } from "../firebase-config";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";

import AuthContext from "../context/AuthContext";


export default function DisplayNameSetup() {
  const { user, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const logout = async () => {
    await signOut(auth);
  };
  const updateDisplayName = async () => {
    try{
      const update = {
        displayName: displayName,
        photoURL: "test"
      };
      
       updateProfile(auth.currentUser, update);
       onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);})
       
        console.log(user);
      }
        catch(error){console.log(error.message);}
        
      };
    return (
    <div>
      <div>
        <input
          editable="true"
          placeholder="Display Name"
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
      </div>
      
      <div>
        
        <button onClick={() => {updateDisplayName(); window.location.reload(false);}} >Submit</button>
        </div>
      
      </div>
  );
        }
   
      

