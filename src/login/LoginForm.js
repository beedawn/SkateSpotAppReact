import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Button, Link } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";


export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passReset, setPassReset] = useState(false);
  const [error, setError] = useState("");
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  
const passwordReset = async () => {

  await sendPasswordResetEmail(auth, loginEmail)
  .then(() => {
    // Password reset email sent!
    console.log("password email sent")
    setPassReset(false);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
console.log(errorMessage)
  });
}

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!passReset) {
    return (
      <div>
        <div>
          <input
            editable="true"
            placeholder="Email"
            onChange={(event) => setLoginEmail(event.target.value)}
          />
        </div>
        <div className="globalTopMargin">
          <input
            editable="true"
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <div style={{ color: "red" }}> {error === "Firebase: Error (auth/email-already-in-use)." ? (<>This email is already in use try again.</>) : (<></>)}
            {error === "Firebase: Password should be at least 6 characters (auth/weak-password)." ? (<>Password is weak, should be at least 6 characters.</>) : (<></>)}

          </div> <div style={{ marginTop: "1rem" }}>
            <Button color="primary" onClick={register}>
              Sign Up{" "}
            </Button>
            <Button color="primary" onClick={login}>
              {" "}
              Login{" "}
            </Button>

          </div><Button color="success" onClick={() => (setPassReset(true))}>Reset Password</Button>
        </div>
      </div>
    );
  } if (passReset) {
    return (<div>    <input
      editable="true"
      placeholder="Email"
      onChange={(event) => setLoginEmail(event.target.value)}
    />
    <Button color="success" onClick={passwordReset}>Reset Password</Button>
    </div>)
  }

}

