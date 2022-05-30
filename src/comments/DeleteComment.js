import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import {
  doc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import "../styles/style.css";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";

export default function DeleteComment() {
  const { id, spot } = useParams();
  const [agree, setAgree] = useState("");
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "comments"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const filteredProduct = spots.filter(function (el) {
    return el.id === id;
  });

  const handleDelete = async (id) => {
    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);
    refreshPage(spot);
  };

  if (filteredProduct.length === 0) {
    return <div> <Loading /></div>;
  } else {
    return (
      <div className="deleteComment">
        <h2>Delete a Comment</h2>
        {filteredProduct.map((id) => (
          <div className="globalTopMargin">
            <h3>Comment Title:</h3>
            <p> {id.title}</p>
          </div>
        ))}

        {filteredProduct.map((id) => (
          <div style={{ marginTop: "1rem" }}>
            <p> {id.comment}</p>
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
              <Button color="danger" onClick={() => handleDelete(id)}>
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
                refreshPage(spot);
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
