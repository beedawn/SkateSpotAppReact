import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";

import { storage } from "../firebase-config";

import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import "../styles/style.css";

export default function DeleteComment() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);

  const [agree, setAgree] = useState("");

  const [spots, setSpots] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const filteredProduct = spots.filter(function (el) {
    return el.id === spot;
  });

  const handleDelete = async (id) => {
    const docRef = doc(db, "spots", id);

    await deleteDoc(docRef);
    refreshPage();
  };

  const refreshPage = async () => {
    window.location.replace("/spots/");
  };
  if (filteredProduct.length === 0) {
    return <div> 404 Error - Not Found</div>;
  } else {
    return (
      <div className="globalTopMargin">
        <h2>Delete a Spot</h2>
        {filteredProduct.map((spot) => (
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
