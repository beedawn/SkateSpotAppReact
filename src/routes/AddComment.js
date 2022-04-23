import React, { useState, useContext } from "react";
import { Button } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from 'react-router-dom';

export default function AddComment() {
    const { spot } = useParams();
  const { user } = useContext(AuthContext);
 
  const [userComment, setUserComment] = useState("");
  

  const handleNewComment = async () => {
    const collectionRef = collection(db, "comments");
    const payload = {
      spot: spot,
      name: user.displayName,
      comment: userComment,
      admin:user.email
    };
    await addDoc(collectionRef, payload);
    refreshPage();
  };
 
  
  const refreshPage = async () => {
    
    window.location.replace('/spot/'+spot+'/');
  };
    
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Add a Comment</h2>
      
     
        <div style={{ marginTop: "1rem" }}>
          <textarea
            editable="true"
            placeholder="Description"
            height="50"
            onChange={(event) => setUserComment(event.target.value)}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Button color="primary" onClick={() => {refreshPage()}}> Cancel </Button>
          <Button color="primary" onClick={handleNewComment}>
            {" "}
            Submit{" "}
          </Button>
        </div>
      </div>
    );
  } 

