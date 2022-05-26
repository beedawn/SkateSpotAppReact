import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { onSnapshot, collection } from "firebase/firestore";
import { Row, Col, Button, Tooltip } from "reactstrap";
import { useParams } from "react-router-dom";
import Comment from "../comments/Comment";
import { Link } from "react-router-dom";
import SpotPics from "./SpotComponents/SpotPics";
import Maps from "../maps/Maps";
import Loading from "../graphics/Loading";
import PostedEdited from "./SpotComponents/PostedEdited";
import Like from "./SpotComponents/Like";
import {FaCameraRetro} from 'react-icons/fa';

export default function SingleSpot() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/" + spot + "/");
  const [spots, setSpots] = useState([]);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });

    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);
  // filter spot
  const filteredSpot = spots.filter((el) => {
    return el.id === spot;
  });

  if (filteredSpot.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  console.log(filteredSpot[0])
  return (
    <div>
      {filteredSpot.map((spot) => (
        <div key={spot.id}>
          <div><Row><Col>
            <Maps
              style={{ height: "200px" }}
              spot={[spot]}
              spots={spots}
              singleView={true}
            /></Col>
            </Row>
            <Row><Col xxl="3" lg="6" ><div className="spotCardParent"><div className="spotCard">
            <Row>
            <Col sm="4">
                <div className="publicPrivate">{spot.private?(<div className="private">Private Spot</div>):(<div className="public">Public Spot</div>)}</div></Col>
             <Col sm="4"> <h4>{spot.name}</h4></Col>
          <Col sm="4">
            <Like spot={spot} /></Col>
            <h5>{spot.location}</h5>
            </Row>
            <div>
              {user.email === spot.admin.email ? (
                <div>
                  <Link to={"/spot/" + spot.id + "/edit"}>
                    <Button color="primary" onClick={() => {}}>
                      {" "}
                      Edit{" "}
                    </Button>
                  </Link>
                  <Link to={"/spot/" + spot.id + "/delete"}>
                    <Button color="danger" className="adminButtonsEach">
                      Delete
                    </Button>
                  </Link>
                </div>
              ) : (
                <p></p>
              )}
            </div>
         
            <div>
              
              <Link to={"/spot/" + spot.id + "/upload"}>
                <Button color="success" className="adminButtonsEach">
                 <FaCameraRetro />
                </Button>
              </Link>{" "}
            </div>
            <PostedEdited spot={spot} />
            </div>
            </div>
            </Col>
            <Col xxl="3" lg="6"><div className="singleSpotPics"><div className="singleSpotPicsInner">{filteredSpot[0].images.length === 0 ? (
              <div><Link to={"/spot/" + spot.id + "/upload"}>Add a picture?</Link></div>
            ) : (
              <SpotPics />
            )}</div>
            </div></Col>
            <Col xxl="3" lg="6">
<div className="singleSpotDescription">
  <div className="singleSpotDescriptionInner">
    <h4>Spot Description</h4>
            <p>{spot.description}</p></div></div></Col> <Col xxl="3" lg="6"> <Comment /></Col>
            </Row>
          </div>
     
      <div>
        <a href="/spots/">Back to Spots</a>
      </div>
       </div>
      ))}
    </div>
  );
}
