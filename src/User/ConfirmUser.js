import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button, Input, Form } from "reactstrap";
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
    <Form onSubmit={(event)=>{event.preventDefault();
    if(signedIn){
      editEmail(email);
    }else{
      handleNewUser(email);

    }
    }}>
    <div className="confirmUserStyle">
      <p>Does your email look good?</p>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
     
      {signedIn ? (
        <Button type="submit" color="primary" onClick={(event) =>{event.preventDefault();editEmail(email);} }>
          Confirm
        </Button>
      ) : (
        <Button type="submit" color="primary" onClick={(event) =>{event.preventDefault(); handleNewUser(email)}}>
          Confirm
        </Button>
      )}
       <Link to="/account">
        <Button color="danger">Start Over</Button>
      </Link>
    </div>
    </Form>
  );
}
