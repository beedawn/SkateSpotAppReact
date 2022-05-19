import React, { useContext,useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";


import { v4 } from "uuid";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
import AllSpotsMap from "../maps/AllSpotsMap";
import Loading from "../graphics/Loading";

export default function Dashboard() {
  
const [spots, setSpots] = useState([]);
  useEffect(() => {
  
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsub;
  }, []);
  const { user } = useContext(AuthContext);

if (spots.length !== 0) {
  console.log(user)
 
  return (
    <div>
      {/* <AllSpotsMap spots={spots}/> */}
        <div>Logo</div>
        <div>Welcome {user.displayName}</div>
        <div>New spots</div> <div>Updates</div>{" "}
      </div>)
    } else {
      return (
        <div style={{ padding: "1rem 0" }}>
          
          <Loading />
        </div>
      );
    }
  
    
  
}
