import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import "../styles/style.css";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";

export default function EditComment() {
  const { id, spot } = useParams();
  const { user } = useContext(AuthContext);
  const [userTitle, setUserTitle] = useState("");
  const [userComment, setUserComment] = useState("");
  const [spots, setSpots] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (filteredSpots[0] !== undefined) {
      setUserTitle(filteredSpots[0].title);
      setUserComment(filteredSpots[0].comment);
    }
    const unsub = onSnapshot(collection(db, "comments"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, [load]);

  const filteredSpots = spots.filter(function (el) {
    return el.id === id;
  });

  const handleEdit = async (id) => {
    const docRef = doc(db, "comments", id);
    const date = new Date(Date.now());
    const payload = {
      title: userTitle,
      comment: userComment,
      admin: user.email,
      spot: spot,
      name: user.displayName,
      time: date.toString(),
    };
    await setDoc(docRef, payload);
    refreshPage(spot);
  };
  if (filteredSpots.length === 0) {
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="globalTopMargin" onMouseOver={() => setLoad(true)}>
        <h2>Edit a Comment</h2>
        {filteredSpots.map((id) => (
          <div className="globalTopMargin">
            <Input
              value={userTitle}
              // defaultValue={id.title}
              onChange={(event) => setUserTitle(event.target.value)}
            />
          </div>
        ))}
        {userTitle ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please enter Spotname</span>
        )}
        {filteredSpots.map((id) => (
          <div style={{ marginTop: "1rem" }}>
            <Input
              editable="true"
              value={userComment}
              // defaultValue={id.comment}
              type="textarea"
              onChange={(event) => setUserComment(event.target.value)}
            />
            <div>
              <Link to={"/spot/" + spot + "/Comments/" + id.id + "/delete"}>
                <Button color="danger"> Delete </Button>
              </Link>
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
