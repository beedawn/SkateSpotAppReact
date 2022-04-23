import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Account() {
  const { user } = useContext(AuthContext);
  return (
    <div className="globalTopMargin">
      <h2>Account Info</h2>
      <p>Username: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <p>
        Picture: <img src={user.photoURL} alt="Avatar" height="50px" />
      </p>
    </div>
  );
}
