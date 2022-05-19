import React, {useContext,useState } from 'react';
import AuthContext from "../context/AuthContext";
import { Button, Input } from "reactstrap";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function ConfirmUser(props) {
    const editEmail=props.editEmail;
    const signedIn=props.signedIn;
    const handleNewUser= props.handleNewUser;
    const { user, setUser } = useContext(AuthContext);
  const [userState, setUserState ] = useState();
  const [email, setEmail] = useState();
    return (
         <div>
<p>Does your email look good?</p>
<Input defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} />
<Button color="danger">Start Over</Button>
{signedIn ?(<Button color="primary" onClick={editEmail}>Confirm</Button>):(<Button color="primary" onClick={handleNewUser}>Confirm</Button>)}
</div>)
}
