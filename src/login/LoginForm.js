import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Button } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";


export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };
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
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Button color="primary" onClick={register}>
          Sign Up{" "}
        </Button>
        <Button color="primary" onClick={login}>
          {" "}
          Login{" "}
        </Button>
      </div>
    </div>
  );
}
