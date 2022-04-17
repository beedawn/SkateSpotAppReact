

  import React, { useState } from "react";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { auth } from "../firebase-config";
  import {Button} from "reactstrap";
  import { doc, setDoc } from "firebase/firestore"; 
  
export default function AddSpot() {
    // const newSpot = async() =>{
    //     await setDoc(doc(db, "spots", ))
    // }
    return (
      <div style={{ padding: "1rem 0"}}>
        <h2>Add a Spot</h2>
        <div >
        <input
          editable="true"
          placeholder="Spot Name"
          
        />
      </div>
      <div style={{marginTop: "1rem"}}>
        <textarea
          editable="true"
          placeholder="Description"
            height="50"
          
        />
      </div>
      <div style={{marginTop: "1rem"}}>
        <Button color="primary"  > Cancel </Button>
        <Button color="primary" > Submit </Button>
      </div>
      </div>
    );
  }


