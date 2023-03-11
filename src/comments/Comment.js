import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { Button, Card, CardHeader, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/style.css";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import LazyLoad from "react-lazyload";
import { FaCameraRetro, FaPencilAlt } from "react-icons/fa";
export default function Comment(props) {
  const close = props.close;
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const { spot, id } = useParams();

  function openCommentEdit(item) {
    setOpenComment(item);
  }
  const filteredComments = comments.filter(function (comment) {
    return comment.spot === spot;
  });
  if (comments.length !== 0) {
    if (!openComment) {
      return (
        <div>
          <div className="globalTopMargin"> </div>
          <div className="commentSingleSpot">
          <h4 >Comments</h4>

          {/* <Link to={"/spot/" + spot + "/addComment/"}> */}
          <Button onClick={() => setOpenComment(true)}>Comment</Button>
          {/* </Link> */}
          <div >
            {filteredComments.filter((cmt) => cmt.spot === spot).length > 0 ? (
              `${comments.filter((cmt) => cmt.spot === spot).length} Comments`
            ) : (
              <></>
            )}
            </div>
            {filteredComments.map((comment) => (
              <div className="commentRender" key={comment.id}>
                <LazyLoad height={200}>
                  <div className="commentTitle">{comment.title}</div>
                  <div style={{ padding: "1rem 0" }}>
                    <div>
                      {user.email === comment.admin ? (
                        <div className="adminButtons">
                          <Link
                            to={"/spot/" + spot + "/Comments/" + comment.id}
                          >
                            <FaPencilAlt className="editIcon" size={30} />
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="36"
                              height="36"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div style={{ fontSize: "12px" }}>{comment.comment}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "10px" }}>
                    {" "}
                    Posted By:{" "}
                    <Link to={"/users/" + comment.userId}>
                      {comment.name}
                    </Link>{" "}
                    on {comment.time};
                  </div>
                </LazyLoad>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <AddComment close={close} openCommentEdit={openCommentEdit} />
          {filteredComments.map((comment) => (
            <div className="commentRender" key={comment.id}>
              <LazyLoad height={200}>
                <div className="commentTitle">{comment.title}</div>
                <div style={{ padding: "1rem 0" }}>
                  <div>
                    {user.email === comment.admin ? (
                      <div className="adminButtons">
                        <Link to={"/spot/" + spot + "/Comments/" + comment.id}>
                          <FaPencilAlt className="editIcon" size={30} />
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div style={{ fontSize: "12px" }}>{comment.comment}</div>
                  </div>
                </div>
                <div style={{ fontSize: "10px" }}>
                  {" "}
                  Posted By:{" "}
                  <Link to={"/users/" + comment.userId}>
                    {comment.name}
                  </Link> on {comment.time};
                </div>
              </LazyLoad>
            </div>
          ))}
        </div>
      );
    }
  } else {
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Comments</h2>
      </div>
    );
  }
}
