import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { onSnapshot, collection } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Input } from "reactstrap";
import "../styles/style.css";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

export default function ImageUpload() {
  const { spot } = useParams();
  const vkey = v4();
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/spots/" + spot + "/");

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

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/spots/${spot}/${vkey}`);
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
        <h3> Image Upload</h3>
        <Input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
      </div>
      
      <div style={{ marginTop: "1rem" }}>
     
        <Button color="primary" onClick={handleUpload}>
          Submit
        </Button>
      </div>
    </div>
  );
}
