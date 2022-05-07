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
  getDownloadURL, deleteObject
} from "firebase/storage";
import { Input } from "reactstrap";
import "../styles/style.css";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

export default function DeleteImage() {
  const { spot, id } = useParams();
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

  const filteredSpot = spots.filter((el) => {
    return el.id === spot;
  });
 

  const handleDelete = () => {
    const imageRef = ref(storage, `images/${spot}/${id}`);

  deleteObject(imageRef).then(()=>{
      //file deleted successfully!
  }).catch((error)=>{
      console.log(error);
  })
  };
  const imageSpot = imageList.filter((image) => {
    return image.search(vkey);
  });
// console.log(filteredSpot[0].images)
//   const imgArr = filteredSpot[0].images;
//  const imgArr2 = imgArr.filter((el)=>el.spot===spot);
//   const imgObjUpArray = filteredSpot[0];

// imgObjUpArray.images.map((img)=>console.log(img.url));
  return (
    <div className="globalTopMargin">
      <div style={{ marginTop: "1rem" }}>
        <h2> Spot {spot}</h2>
        <h3> Image Deletion</h3>
        {/* {console.log(imageList)} */}
        {/* {imgArr2.map((string)=>(<div><img alt="Spot Pics" src={string.spot}/></div>))} */}
        {console.log(filteredSpot[0])}
        {/* {filteredSpot[0].images.map((image)=>{return (<img alt="Spot Pictures" src={image.url} />)})}  */}
      </div>
     
      <div style={{ marginTop: "1rem" }}>
       
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
