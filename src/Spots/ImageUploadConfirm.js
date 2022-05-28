import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";


export default function ImageUploadConfirm() {
  const { spot, id } = useParams();
  const { user } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/spots/" + spot + "/");
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
  // filter spot
  const filteredSpot = spots.filter((el) => {
    return el.id === spot;
  });

  const arrayPush = (array) => {
    const date = new Date(Date.now());
    array.push({
      displayName: user.displayName,
      email:user.email,
      id: id,
      spot: spot,
      url: imageList[imageList.length - 1],
      time: date.toString(),
    });
    return array;
  };
  const imageArrayHandler = (filteredSpot) => {
    if (filteredSpot[0].images) {
      const arrayImg = [...filteredSpot[0].images];
      return arrayPush(arrayImg);
    } else {
      const arrayImg = [];
      return arrayPush(arrayImg);
    }
  };
  const handleEdit = async (id, url) => {
    const docRef = doc(db, "spots", id);
    const date = new Date(Date.now());
    const payload = {
  ...filteredSpot[0],
      images: imageArrayHandler(filteredSpot),
      time: date.toString(),
    };
    await setDoc(docRef, payload);
    refreshPage(spot);
  };

  if (filteredSpot.length === 0) {
    return <div><Loading /></div>;
  }
  return (
    <div className="imageUploadSpot">
      <div >
        <h2>Confirm Image Upload</h2>
      </div>
      {filteredSpot.map((spot) => (
        <div style={{ padding: "1rem 0" }} key={spot.id}>
            <h4>{spot.name}</h4>
            <div>
              <img
                alt={imageList[imageList.length - 1]}
                src={imageList[imageList.length - 1]}
                style={{ height: "200px" }}
              />
            </div>
            <div>
              <div>
                <Button color="primary" onClick={() => handleEdit(spot.id)}>
                  {" "}
                  Confirm Upload{" "}
                </Button>
              </div>
            </div>
        </div>
      ))}
      <div>
        <a href={`/spot/${spot}`}>Back to Spot</a>
      </div>
    </div>
  );
}
