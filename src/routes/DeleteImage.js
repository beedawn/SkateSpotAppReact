import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import {
  onSnapshot,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import "../styles/style.css";

import { useParams } from "react-router-dom";

export default function DeleteImage() {
  const { spot, id } = useParams();
  const imageListRef = ref(storage, "images/" + spot + "/");
  const [spots, setSpots] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });

    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const filteredSpot = spots.filter((el) => {
    return el.id === spot;
  });

  const refreshPage = async () => {
    window.location.replace("/spot/" + spot );
  };

  //  const imagePreview = filteredSpot[0].images.filter((el)=>{return el.id === id}).url;
  const handleDelete = async () => {
    
    const imageRef = ref(storage, `images/${spot}/${id}`);
    const imageFilter = filteredSpot[0].images.filter((el)=>{return el.id !== id})
    
    console.log(imageFilter)

   
    const docRef = doc(db, "spots", spot);
    const payload = {
      name: filteredSpot[0].name,
      location: filteredSpot[0].location,
      description: filteredSpot[0].description,
      admin: filteredSpot[0].admin,
      time: filteredSpot[0].time,
      images: imageFilter,
      timePosted: filteredSpot[0].timePosted,
      edited: filteredSpot[0].edited,
    };
    console.log(payload)
    await setDoc(docRef, payload);
    
    deleteObject(imageRef)
      .then(() => {
        refreshPage();
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
        {/* <img src={imagePreview[0].url} style={{height:"200px"}} /> */}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
