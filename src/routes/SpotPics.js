import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import Comment from "../comments/Comment";
import { Link } from "react-router-dom";


export default function SpotPics() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, ('images/' + spot + '/'));
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    listAll(imageListRef).then((response)=>{
      response.items.forEach((item)=> {
          getDownloadURL(item).then((url) => {
              setImageList((prev)=> [...prev, url]);
             
          })
      })
      

})



    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;


  }, []);
  // filter spot
  const filteredSpot = spots.filter((el) => {
    return el.id === spot;
  });
 


  if (filteredSpot.length === 0) {
    return <div>404 Error - Not Found</div>;
  }
  

  return (
    <div>
      {filteredSpot.map((spot) => (
          <div key={spot.id}>
       {filteredSpot[0].images ? filteredSpot[0].images.map((image)=> {return(<div><img src={image.url} style={{height:"200px"}}/><p>Posted By: {image.displayName} on {image.time}</p></div>)}) :(<div></div>)}
          </div>
        
      ))}
    </div>
  );
}
