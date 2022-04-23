import React, { useState, useContext } from "react";
import { Button } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

export default function AddComment() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);

  const [userComment, setUserComment] = useState("");
  const [userTitle, setUserTitle] = useState("");

  const handleNewComment = async () => {
    const collectionRef = collection(db, "comments");
    const payload = {
      spot: spot,
      name: user.displayName,
      title: userTitle,
      comment: userComment,
      admin: user.email,
    };
    await addDoc(collectionRef, payload);
    refreshPage();
  };

  const refreshPage = async () => {
    window.location.replace("/spot/" + spot + "/");
  };

  return (
    <div style={{ padding: "1rem 0" }}>
      <h2>Add a Comment</h2>

      <div>
        <input
          editable="true"
          placeholder="Title of Comment"
          onChange={(event) => setUserTitle(event.target.value)}
        />
      </div>
      {userTitle ? (
        <p></p>
      ) : (
        <span style={{ color: "red" }}>Please enter a Title</span>
      )}
      <div style={{ marginTop: "1rem" }}>
        <textarea
          editable="true"
          placeholder="Comment"
          height="50"
          onChange={(event) => setUserComment(event.target.value)}
        />
      </div>
      {userComment ? (
        <p></p>
      ) : (
        <span style={{ color: "red" }}>Please enter a Comment</span>
      )}
      <div style={{ marginTop: "1rem" }}>
        <div>
          {" "}
          {userComment && userTitle ? (
            <Button color="primary" onClick={handleNewComment}>
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
          {" "}
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
