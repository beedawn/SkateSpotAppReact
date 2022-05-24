import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext.js";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
import Loading from "../graphics/Loading.js";
import {FaUserCircle} from 'react-icons/fa';

export default function Account() {
  const { user } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUserList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const filteredUsers = userList.filter((oneUser) => {
    return (oneUser.myid === user.photoURL);
  })
  if (filteredUsers.length !== 0) {
    return (
      <div className="globalTopMargin">
        <h2>Account Info</h2>
        <p>Username: {filteredUsers[0].name}</p>
        <p>{filteredUsers[0].id}</p>
        <p>Email: {filteredUsers[0].email}</p>
       <p>Picture: {filteredUsers[0].images[filteredUsers[0].images.length-1] ? ( <img src={filteredUsers[0].images[filteredUsers[0].images.length-1].url} alt="Avatar" height="25px" />):(<><FaUserCircle /></>)}
        </p>
        <Link to="/edit">Edit Profile</Link>
      </div>
    );
  } else {
    return (
      <Loading />
    )
  }
}
