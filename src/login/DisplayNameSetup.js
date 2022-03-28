import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { Button } from 'reactstrap';

import AuthContext from "../context/AuthContext";


export default function DisplayNameSetup() {
  const { user, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");

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
        
        <Button color="primary" onClick={() => {updateDisplayName();}} >Submit</Button>
        </div>
      
      </div>
  );
        }
   
      

