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
  if(mySpot){
    
const filterSpots=spots.filter((spot)=>{return(user.email===spot.admin.email)});
console.log(filterSpots)
    return(
      <div className="globalTopMargin">
      <h2>My Posted Spots</h2>
      <SpotsRender spots={filterSpots} />
  </div>
  )}
    
if(sharedSpot){
  return (
    <div className="globalTopMargin">
      <h2>Spots Shared with me.</h2>
      <SpotsRender spots={spots} />
 </div>
  )
}
  else {
    return (
      
        <div className="globalTopMargin">
          <h2>Spots</h2>
          <SpotsRender spots={spots} />
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