import React, { useState, useContext,useEffect } from "react";
import AuthContext from "../context/AuthContext.js";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
import Loading from "../graphics/Loading.js";
export default function Account() {
  const { user } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  useEffect(() => {

    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUserList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsub;
  }, [userList]);

  const filteredUsers = userList.filter((oneUser)=>{return(oneUser.myid===user.photoURL);

  })
  // console.log(filteredUsers)
  if(filteredUsers.length!==0){
  return (
    <div className="globalTopMargin">
      <h2>Account Info</h2>
      <p>Username: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <p>
        Picture: <img src={filteredUsers[0].images[0].url} alt="Avatar" height="50px" />
      </p>
      <Link to="/edit">Edit Display Name</Link>
    </div>
  );
}else{
  return(
    <Loading />
  )

}
}
