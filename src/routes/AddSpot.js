

  import React, { useState } from "react";
  import {Button} from "reactstrap";
  import { collection, doc, addDoc } from "firebase/firestore"; 

export default function AddSpot() {
 const [data, setData] = useState();
  const db = collection();
    const newSpot = async() =>{
         const docRef = await addDoc(doc(db, "spots", data));
         console.log ("Document written with ID:" , docRef.id);
     }
    return (
      <div style={{ padding: "1rem 0"}}>
        <h2>Add a Spot</h2>
        <div >
        <input
          editable="true"
          placeholder="Spot Name"
          onChange={(event)=> {
            setData(event.target.value);
          
          }}
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
        <Button color="primary" onClick={() => {newSpot();}}> Submit </Button>
      </div>
      </div>
    );
  }


