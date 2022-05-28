import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Button, Link } from "reactstrap";
import "../styles/style.css";
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
        console.log(errorCode)
        console.log(errorMessage)
        setError(errorMessage)
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
      setError(error.message);
    }
  };
  if (!passReset) {
    return (
      <div className="login">
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
          <div style={{ color: "red" }}> {error ? (<>{error}</>):(<></>)}
          </div> <div className="loginButtonContainer">
            <div className="loginButtonSignUp">
            <a href="#!"> <div onClick={register}>
             Sign Up
            </div></a></div>
            <div className="loginButtonLogin">
            <Button color="primary" onClick={login}>
              {" "}
              Login{" "}
            </Button>
            </div>
          </div><div className="loginButtonResetPassword"><Button color="success" onClick={() => (setPassReset(true))}>Reset Password</Button></div>
        </div>
      </div>
    );
  } if (passReset) {
    return (<div>  <h2>Reset Password</h2>  <div><input
      editable="true"
      placeholder="Email"
      onChange={(event) => setLoginEmail(event.target.value)}
    /></div>
    <div style={{ color: "red" }}> {error === "Firebase: Error (auth/missing-email)." ? (<>Please enter your email.</>) : (<></>)}</div>
      <div style={{ color: "red" }}> {error === "Firebase: Error (auth/user-not-found)." ? (<>Email not found. Have you signed up yet?</>) : (<></>)}
      </div>
      <div>
            <Button color="primary" onClick={() => (setPassReset(false))}>Back</Button><Button color="success" onClick={passwordReset}>Submit</Button>
      </div>
    </div>)
  }
}

