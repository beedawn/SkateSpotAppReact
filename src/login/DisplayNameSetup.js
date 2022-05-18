import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { Button } from "reactstrap";

import AuthContext from "../context/AuthContext";

export default function DisplayNameSetup(props) {
  //Need to add a way to verify DisplayName isn't already used?
const image=props.image;
  const { user, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");

  const updateDisplayName = async () => {
    try {
      const update = {
        ...user,
        displayName: displayName,
         };

      updateProfile(auth.currentUser, update);
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        
      });

      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    
  };
  const refreshPage = async () => {
    await updateDisplayName();
   window.location.replace("/account");
  };
  return (
    <div>
      <div>
        <input
          editable="true"
          defaultValue={user.displayName}
          placeholder="Display Name"
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
      </div>
<div>{image}</div>
      <div>
        <Button
          color="primary"
          onClick={() => {
            refreshPage();
          }}
        >
          Submit
        </Button>
       
      </div>
    </div>
  );
}
