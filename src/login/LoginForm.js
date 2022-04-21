import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Button } from "reactstrap";

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
      console.log(user);
    } catch (error) {
      console.log(loginEmail);
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
      console.log(user);
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
      <div style={{ marginTop: "1rem" }}>
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
