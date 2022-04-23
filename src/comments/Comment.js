import { onSnapshot, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import loading from "../images/Loading_icon.gif";
import AuthContext from "../context/AuthContext";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
export default function Comment() {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const { spot } = useParams();
  const filteredComments = comments.filter(function (comment) {
    return comment.spot === spot;
  });
  if (comments.length !== 0) {
    return (
      <div>
        <div style={{ padding: "1rem" }}>
          {" "}
          <h4>Comments</h4>
          <Link to={"/spot/" + spot.id + "/addComment/"}>
                Add a Comment
              </Link>
        </div>
        {filteredComments.map((comment) => (
          <div style={{ padding: "1rem 0" }}>
            <div key={comment.id}>
              <p>Posted By: {comment.name}</p>
              <div>
                <p>{comment.comment}</p>
              </div>
           

              <div>
                {user.email === comment.admin ? (
                  <Button color="primary" onClick={() => {}}>
                    {" "}
                    Edit{" "}
                  </Button>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Comments</h2>
        <div>
          <img src={loading} alt="Loading" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }
}
