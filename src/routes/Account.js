import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
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
      <Link to="/edit" >Edit Display Name</Link>

    </div>
  );
}
