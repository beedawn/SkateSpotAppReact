

  import React, { useState } from "react";
  import {Button} from "reactstrap";
  import { collection, addDoc } from "firebase/firestore"; 
  import {db} from "../firebase-config";
  import { useNavigate } from 'react-router-dom';

export default function AddSpot() {
 const [spotLocation, setSpotLocation] = useState("");
 const [spotName, setSpotName] = useState("");
const [spotDescription, setSpotDescription] = useState("");


 const handleNew = async () => {
    // const name = prompt("Enter a spot name");
    // const location = prompt("Enter a spot location");

   const collectionRef = collection(db,"spots");
   const payload = { name: spotName, location: spotLocation, description:spotDescription};
  await addDoc(collectionRef, payload);

 }
    return (
      <div style={{ padding: "1rem 0"}}>
        <h2>Add a Spot</h2>
        <div >
        <input
          editable="true"
          placeholder="Spot Name"
          
          onChange={event =>setSpotName(event.target.value)}
         
        />
      </div>
      <div style={{marginTop: "1rem"}}>
        <input
          editable="true"
          placeholder="Spot Location"
          
          onChange={event =>setSpotLocation(event.target.value)}
         
        />
      </div>
      <div style={{marginTop: "1rem"}}>
        <textarea
          editable="true"
          placeholder="Description"
            height="50"
            onChange={event =>setSpotDescription(event.target.value)}
        />
      </div>
      <div style={{marginTop: "1rem"}}>
        <Button color="primary"  > Cancel </Button>
        <Button color="primary" onClick={handleNew}> Submit </Button>
      </div>
      </div>
    );
  }


