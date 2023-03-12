import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { Button } from "reactstrap";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";

import "../styles/style.css";
export default function DisplayNameSetup(props) {
  //Need to add a way to verify DisplayName isn't already used?
  const image = props.image;
  const { user, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUserList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);
  const filteredUser = userList.filter((el) => {
    return el.myid === user.photoURL;
  });
  const updateDisplayName = async () => {
    try {
      const update = {
        ...user,
        displayName: displayName,
      };
      //need to add this display name update to the DB
      const docRef = doc(db, "users", user.photoURL);
      const payload = {
        ...filteredUser[0],
        name: displayName,
      };

      await setDoc(docRef, payload);
      updateProfile(auth.currentUser, update);
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const refreshPage = async () => {
    await updateDisplayName();
    window.location.replace("/account");
  };
  if (filteredUser[0] !== undefined) {
    return (
      <div className="displayNameStyle">
        Display name setup:
        <div>
          <input
            editable="true"
            value={displayName}
            placeholder="Display Name"
            onChange={(event) => {
              setDisplayName(event.target.value);
            }}
          />
        </div>
        <div>{image}</div>
        <div>{displayName.length>0?
          <Button
            color="primary"
            onClick={() => {
              refreshPage();
            }}
          >
            Submit
          </Button>:<p>Please enter a display name.</p>}
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
