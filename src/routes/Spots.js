import { onSnapshot, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import loading from "../images/Loading_icon.gif";

export default function Spots() {
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  if (spots.length !== 0) {
    return (
      <div>
       <div style={{padding:"1rem"}}> <h2>Spots</h2></div>
        {spots.map((spot) => (
          <div style={{padding:"1rem 0"}}>
            <div key={spot.id}>
              <h4>{spot.name}</h4>
              <h5>{spot.location}</h5>
              <div>{/* <p>Image of the spot</p> */}</div>
              <p>{spot.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Spots</h2>
        <div>
          <img src={loading} alt="Loading" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }
}
