import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { db, storage } from "../firebase-config";
import {
  onSnapshot,
  collection,
  doc,

  setDoc,
} from "firebase/firestore";
import {
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { refreshPage } from "../functions/Refresh";
import "../styles/style.css";
import { useParams } from "react-router-dom";

export default function DeleteImage() {
  const { spot, id } = useParams();
  const imageListRef = ref(storage, "images/" + spot + "/");
  const [spots, setSpots] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [imageUrl, setImageUrl]= useState();

  const filteredSpot = spots.filter((el) => {
    
    return el.id === spot;
  });

 
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
    if(filteredSpot[0]){
setImageUrl(filteredSpot[0].images[0].url)
return;
}

    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, [spots]);

 


  

  const handleDelete = async () => {
    const imageRef = ref(storage, `images/${spot}/${id}`);
    const imageFilter = filteredSpot[0].images.filter((el) => {
      return el.id !== id;
    });
    const imageFilterReverse = filteredSpot[0].images.filter((el) => {
      return el.spot === spot;
    });
  
  
    const docRef = doc(db, "spots", spot);
    const payload = {
      ...filteredSpot[0],
      images: imageFilter,
    };
    await setDoc(docRef, payload);
   
    deleteObject(imageRef)
      .then(() => {
         refreshPage(spot);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="globalTopMargin">
      <div style={{ marginTop: "1rem" }}>
        <h2> Spot {spot}</h2>
        <h3> Image Deletion</h3>
   {imageUrl ?(
        <img alt={imageUrl} src={imageUrl} style={{height:"200px"}} />):(<>No Preview available.</>)}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
