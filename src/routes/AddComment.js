import React, { useState, useContext } from "react";
import { Button, Card, CardHeader } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import "../styles/style.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Input } from "reactstrap";
import { v4 } from "uuid";

export default function AddComment() {
  const storage = getStorage();
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const [userComment, setUserComment] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const handleNewComment = async () => {
    const collectionRef = collection(db, "comments");
    const date = new Date(Date.now());
    const payload = {
      spot: spot,
      name: user.displayName,
      title: userTitle,
      comment: userComment,
      admin: user.email,
      time: date.toString(),
      edited: false,
    };

    await addDoc(collectionRef, payload);
    refreshPage();
  };

  const refreshPage = async () => {
    window.location.replace("/spot/" + spot + "/");
  };

  return (
    <div style={{ padding: "1rem 0", width: "500px", margin: "auto" }}>
      <Card>
        <CardHeader>
          Add a Comment{" "}
          <div style={{ display: "inline", marginLeft: "55%" }}>
            {" "}
            <Button
              color="primary"
              onClick={() => {
                refreshPage();
              }}
            >
              {" "}
              Close{" "}
            </Button>
          </div>
        </CardHeader>

        <div>
          <Input
            editable="true"
            placeholder="Title of Comment"
            onChange={(event) => setUserTitle(event.target.value)}
          />
        </div>
        {userTitle ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please enter a Title</span>
        )}
        <div style={{ marginTop: "1rem" }}>
          <Input
            editable="true"
            placeholder="Comment"
            type="textarea"
            onChange={(event) => setUserComment(event.target.value)}
          />
        </div>
        {userComment ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please enter a Comment</span>
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
        </div>
      </Card>
    </div>
  );
}
