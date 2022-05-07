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
} from "firebase/storage";
import { Input } from "reactstrap";
import "../styles/style.css";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

export default function ImageUpload() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const vkey = v4();

  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/" + spot + "/");

  const [imageUpload, setImageUpload] = useState(null);
  const [check, setCheck] = useState("true");
  const [spots, setSpots] = useState([]);

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

  const handleUpload = () => {
    //  if(imageUpload.size > 500000){
    //      setCheck("false");
    //      return(
    //          console.log("File is too Large!")
    //      )
    //  }
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${spot}/${vkey}`);

    uploadBytes(imageRef, imageUpload).then(() => {
      window.location.replace(`/spot/${spot}/uploadConfirm/${vkey}`);
    });
  };
  const imageSpot = imageList.filter((image) => {
    return image.search(vkey);
  });

  return (
    <div className="globalTopMargin">
      <div style={{ marginTop: "1rem" }}>
        <h2> Spot {spot}</h2>
        <h3> Image Upload</h3>
        <Input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
      </div>
      {console.log(imageSpot[0])}
      <div style={{ marginTop: "1rem" }}>
        {check ? <div>File too large!</div> : <p></p>}
        <Button color="primary" onClick={handleUpload}>
          Submit
        </Button>
      </div>
    </div>
  );
}
