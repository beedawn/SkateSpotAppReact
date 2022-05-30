import React, { useContext, useEffect, useState } from "react";
import AllSpotsMap from "../maps/AllSpotsMap";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Row,
  Container,
  Tooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import Maps from "../maps/Maps";
import PostedEdited from "./SpotComponents/PostedEdited";
import AuthContext from "../context/AuthContext";
import { onSnapshot, collection } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import Like from "./SpotComponents/Like";
import "../styles/style.css";
import { FaCameraRetro, FaPencilAlt, FaEye } from "react-icons/fa";
import LazyLoad from "react-lazyload";
export default function SpotsRender(props) {
  const { user } = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const spots = props.spots;
  const my = props.my;
  const shared = props.shared;
  const spotPublic = props.spotPublic;
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);
  return (
    <div>
      <div>
        <Row>
          <Col>
            <AllSpotsMap spots={spots} sm="12" />
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            {spotPublic !== undefined ? <h2>Spots</h2> : <></>}{" "}
            {shared !== undefined ? <h2>Spots Shared with Me</h2> : <></>}{" "}
            {my !== undefined ? <h2>My Posted Spots</h2> : <></>}
          </Col>
        </Row>
      </div>
      <Row>
        {spots.map((spot) => (
          <div
            style={{ padding: "1rem 0", width: "400px", margin: "auto" }}
            key={spot.id}
          >
            <LazyLoad>
              <div className="spotCard">
                <div>
                  <div className="spotCardHeader">
                    <Row>
                      <Col xs="3">
                        <div className="publicPrivate">
                          {spot.private ? (
                            <div className="private">Private Spot</div>
                          ) : (
                            <div className="public">Public Spot</div>
                          )}
                        </div>
                      </Col>
                      <Col xs="3"> <Link to={"/spot/" + spot.id}><FaEye className="viewIcon" size={70}/> </Link></Col>
                      <Col xs="3">
                        {" "}
                        <Link to={"/spot/" + spot.id + "/upload"}>
                          {" "}
                          <FaCameraRetro className="uploadIcon" size={70} />
                        </Link>
                      </Col>
                      <Col xs="3">
                        {" "}
                        <Like spot={spot} />
                      </Col>
                    </Row>
                    <Link to={"/spot/" + spot.id}>
                      <h5>{spot.name}</h5>
                    </Link>
                    <div>
                      {spot.city}, {spot.state}
                    </div>
                    <div>
                      {spot.lat}, {spot.long}
                    </div>
                  </div>

                  <div className="globalMarginTop">
                    <Row>
                      <Col>
                        <Link to={"/spot/" + spot.id + "/addComment/"}>
                          <Button className="spotButton">Comment</Button>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </div>
                <p>{spot.description}</p>
                <p>
                  {comments.filter((cmt) => cmt.spot === spot.id).length > 0 ? (
                    `${
                      comments.filter((cmt) => cmt.spot === spot.id).length
                    } Comments`
                  ) : (
                    <></>
                  )}{" "}
                </p>
                <Row>
                  <Col>
                    <PostedEdited spot={spot} one={true} />
                  </Col>
                  {user.email === spot.admin.email ? (
                    <Col xs="3">
                      <Link to={"/spot/" + spot.id + "/edit"}>
                        {" "}
                        <FaPencilAlt className="editIcon" size={40} />
                      </Link>
                    </Col>
                  ) : (
                    <p></p>
                  )}{" "}
                </Row>
              </div>
            </LazyLoad>
          </div>
        ))}
      </Row>
    </div>
  );
}
