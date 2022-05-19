import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader } from "reactstrap";
import AllSpotsMap from "../maps/AllSpotsMap";
import Loading from "../graphics/Loading";
import Maps from "../maps/Maps";
import PostedEdited from "./SpotComponents/PostedEdited";
import SpotsRender from "./SpotsRender";

export default function Spots(props) {
  const mySpot = props.mySpot;
  const sharedSpot = props.sharedSpot;
  const { spot } = useParams();
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/" + spot + "/");
  const { user } = useContext(AuthContext);
  const [spots, setSpots] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });

     onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsub;
  }, []);


if (spots.length !== 0) {
  console.log(spots)
const filterMySpots=spots.filter((spot)=>{return(user.email===spot.admin.email)});
const filterSharedSpots=spots.filter((spot)=>{
  for(let i=0; i < spot.users.length;i++){
  if( spot.users[i].email===user.email){
    return spot
  } 
 }});
 console.log(filterSharedSpots)
 const publicSpots=filterSharedSpots.concat(spots.filter((spot)=>{return(spot.private===false)}));


  if(mySpot){

    return(
      <div className="globalTopMargin">
      <h2>My Posted Spots</h2>
      <SpotsRender spots={filterMySpots} />
  </div>
  )}
    
if(sharedSpot && filterSharedSpots.length !== 0){
  return (
    <div className="globalTopMargin">
      <h2>Spots Shared with me.</h2>
      <SpotsRender spots={filterSharedSpots} />
 </div>
  )
}if(sharedSpot && filterSharedSpots.length === 0){
  return(<div> No Shared Spots.</div>)
}
  else {
    return (
      
        <div className="globalTopMargin">
          <h2>Spots</h2>
          <SpotsRender spots={publicSpots} />
      </div>
    );
  }} else {
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Spots</h2>
        <Loading />
      </div>
    );
  }
}
