import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import "../styles/style.css";

export default function ConfirmUser(props) {
  const editEmail = props.editEmail;
  const signedIn = props.signedIn;
  const handleNewUser = props.handleNewUser;
  const { user, setUser } = useContext(AuthContext);
  const [userState, setUserState] = useState();
  const [email, setEmail] = useState(user.email);

  return (
    <div className="confirmUserStyle">
      <p>Does your email look good?</p>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Link to="/account">
        <Button color="danger">Start Over</Button>
      </Link>
      {signedIn ? (
        <Button color="primary" onClick={() => editEmail(email)}>
          Confirm
        </Button>
      ) : (
        <Button color="primary" onClick={() => handleNewUser(email)}>
          Confirm
        </Button>
      )}
    </div>
  );
}
