import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import {
  doc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import "../styles/style.css";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";
import {
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function DeleteComment() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);

  const [agree, setAgree] = useState("");
const [comments,setComments]=useState([]);
  const [spots, setSpots] = useState([]);
  useEffect(() => {
     onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);
  const filteredComments = comments.filter(function (comment) {
    return comment.spot === spot;
  });
  const filteredSpots = spots.filter(function (el) {
    return el.id === spot;
  });

  const handleDelete = async (id) => {
    const docRef = doc(db, "spots", id);
   ;
    await deleteDoc(docRef);
    

    for(let i = 0; i < filteredComments.length;i++){
      const docRef2 = doc(db, "comments", filteredComments[i].id);
      await deleteDoc(docRef2);
    }

    for(let i = 0; i < filteredSpots[0].images.length;i++){
      const imageRef = ref(storage, `images/${spot}/${filteredSpots[0].images[i].id}`);
    deleteObject(imageRef)
    .then(() => {
      console.log(imageRef)
    })
    .catch((error) => {
      console.log(error);
    });
  }
    refreshPage();
  };

  if (filteredSpots.length === 0) {
    return <div> <Loading /></div>;
  } else {
    return (
      <div className="globalTopMargin">
        <h2>Delete a Spot</h2>
        {filteredSpots.map((spot) => (
          <div className="globalTopMargin">
            <h3>Spot Title:</h3>
            <p> {spot.name}</p>
            <p> {spot.location}</p>
            <p> {spot.description}</p>
          </div>
        ))}

        <div className="globalTopMargin">
          <Input
            placeholder="Are you sure? (yes)"
            onChange={(event) => setAgree(event.target.value)}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <div>
            {agree ? (
              <Button color="danger" onClick={() => handleDelete(spot)}>
                Delete
              </Button>
            ) : (
              <p>
                Once you complete the required forms a submit button will appear
                here
              </p>
            )}
          </div>
          <div>
            <Button
              color="primary"
              onClick={() => {
                refreshPage();
              }}
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
