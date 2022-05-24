import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardText,
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
    return (
      <div>
        <div className="globalTopMargin"> </div>
        <h4>Comments</h4>

        <Link to={"/spot/" + spot + "/addComment/"}>
                <Button>Comment</Button>
              </Link>
        <div style={{ width: "400px", margin: "0 auto" }}>
          {filteredComments.filter((cmt) => cmt.spot === spot).length > 0 ? (
            `${comments.filter((cmt) => cmt.spot === spot).length} Comments`
          ) : (
            <></>
          )}
          {filteredComments.map((comment) => (
            <Card className="mt-5" key={comment.id}>
              <CardHeader>{comment.title}</CardHeader>
              <div style={{ padding: "1rem 0" }}>
                <div>
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
                  <CardText style={{ fontSize: "12px" }}>
                    {comment.comment}
                  </CardText>
                </div>
              </div>
              <CardTitle style={{ fontSize: "10px" }}>
                {" "}
                Posted By: <Link to={"/users/"+ comment.userId}>{comment.name}</Link> on {comment.time};
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
      </div>
    );
  }
}
