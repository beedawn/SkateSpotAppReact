import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { Link } from "react-router-dom";

import { storage } from "../firebase-config";

import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import "../styles/style.css";

export default function EditComment() {
  const { id, spot } = useParams();
  const { user } = useContext(AuthContext);
  const [userTitle, setUserTitle] = useState("");
  const [userComment, setUserComment] = useState("");



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

  const handleEdit = async (id) => {
    console.log(user);
    const docRef = doc(db, "comments", id);
    const date = new Date(Date.now());
    const payload = {
      title: userTitle,
      comment: userComment,
      admin: user.email,
      spot: spot,
      name: user.displayName,
      time: date.toString()
    };
    console.log(docRef);
    await setDoc(docRef, payload);
    refreshPage();
  };

  const refreshPage = async () => {
    window.location.replace("/spot/"+ spot);
  };
  if (filteredProduct.length === 0) {
    return <div> 404 Error - Not Found</div>;
  } else {
    return (
      <div className="globalTopMargin">
        <h2>Edit a Comment</h2>
        {filteredProduct.map((id) => (
          <div className="globalTopMargin">
            <Input
              defaultValue={id.title}
              onChange={(event) => setUserTitle(event.target.value)}
            />
          </div>
        ))}

        {userTitle ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please enter Spotname</span>
        )}

        {filteredProduct.map((id) => (
          <div style={{ marginTop: "1rem" }}>
            <Input
              editable="true"
              defaultValue={id.comment}
              type="textarea"
              onChange={(event) => setUserComment(event.target.value)}
            />

<div>
          <Link to={"/spot/" + spot + "/Comments/" + id.id+ "/delete"}><Button
              color="danger"
             
            >
              {" "}
              Delete{" "}
            </Button></Link>
          </div>
          </div>
          
        ))}
        {userComment ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please enter Description</span>
        )}
        <div style={{ marginTop: "1rem" }}>
          <div>
            {userTitle && userComment ? (
              <Button color="primary" onClick={() => handleEdit(id)}>
                Submit
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
