import { onSnapshot, collection, doc, getDocs } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import loading from "../images/Loading_icon.gif";
import AuthContext from "../context/AuthContext";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/style.css";

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

  const { spot, id } = useParams();
  const filteredComments = comments.filter(function (comment) {
    return comment.spot === spot;
  });
  if (comments.length !== 0) {
    console.log(spot);
    return (
      <div>
        <div className="globalTopMargin"> </div>

        <h4>Comments</h4>
        <Link to={"/spot/" + spot + "/addComment/"}>Add a Comment</Link>
        <div style={{ width: "400px", margin: "0 auto" }}>
          {filteredComments.map((comment) => (
            <Card className="mt-5">
              <CardHeader>{comment.title}</CardHeader>
              <div style={{ padding: "1rem 0" }}>
                <div key={comment.id}>
                  {user.email === comment.admin ? (
                    <div className="adminButtons">
                      <Link to={"/spot/" + spot + "/Comments/" + comment.id}>
                        <Button color="primary" onClick={() => {}}>
                          {" "}
                          Edit{" "}
                        </Button>
                      </Link>
                      <Link
                        to={
                          "/spot/" +
                          spot +
                          "/Comments/" +
                          comment.id +
                          "/delete"
                        }
                      >
                        <Button
                          color="danger"
                          className="adminButtonsEach"
                          onClick={() => {}}
                        >
                          Delete
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <p></p>
                  )}

                  <p></p>
                  <CardText style={{ fontSize: "12px" }}>
                    <p>{comment.comment}</p>
                  </CardText>

                  <div></div>
                </div>
              </div>
              <CardTitle style={{ fontSize: "10px" }}>
                {" "}
                Posted By: {comment.name} on {comment.time};
                {console.log(comment)}
              </CardTitle>
            </Card>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Comments</h2>

        <Link to={"/spot/" + spot + "/addComment/"}>Add a Comment</Link>
      </div>
    );
  }
}
