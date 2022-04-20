import { onSnapshot, collection } from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {db} from "../firebase-config";
export default function Spots() {
  //need to add query to db to pull all spots?  

  const [spots, setSpots] = useState([]);


  useEffect(
    () => {
    const unsub = onSnapshot(collection(db, "spots"),(snapshot)=>{ setSpots(snapshot.docs.map((doc) => doc.data()));
});

    return unsub;
  })


  return (
      <div style={{ padding: "1rem 0" }}>

        
        <h2>Spots</h2>
        {spots.map((spot) => (
          <div>
          <h4>{spot.name}</h4>
          <h5>{spot.location}</h5>
          <div><p>Image of the spot</p></div>
          <p>Info About the Spot</p>
          </div>
        ))}
      </div>
    );
  }