import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
import { Button } from "reactstrap";



export function SingleSpot(props) {
  const thisSpot = props.spotId;
    const { user } = useContext(AuthContext);
  
console.log(props)
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

 // filter products
  const filteredProduct = spots.filter(function (el) {
    
    return el.id === thisSpot;
  });

  if (filteredProduct.length === 0) {
    
    return <div>404 Error - Not Found</div>;
  }

 return (
   
        <div>
         <div style={{padding:"1rem"}}> <h2>Spots</h2></div>
          {filteredProduct.map((spot) => (
            <div style={{padding:"1rem 0"}}>
             
              <div key={spot.id}>
              
                <h4>{spot.name}</h4>
                <h5>{spot.location}</h5>
                <div>{user.email===spot.admin ? <Button color="primary" onClick={() => {}}> Edit </Button> : <p></p>}</div>
                <p>{spot.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
          }