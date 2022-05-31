import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Container, Row, Col } from "reactstrap";
import { v4 } from "uuid";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
import Loading from "../graphics/Loading";
import { Link } from "react-router-dom";
import "../styles/style.css";
import Help from "../graphics/Help";
import Help2 from "../graphics/Help2";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
const [spotType, setSpotType]=useState(false);
const [spotView, setSpotView]=useState(false);
const [spotUpload,setSpotUpload]=useState(false);
const [spotLike, setSpotLike]=useState(false);

    return (
      <div>
      <Container>
        <Row>
          <div className="globalTopMargin"></div>
        </Row>
        <Row>
          <Col className="confirmUserStyle" lg="7">
            <div>Welcome {user.displayName}, to Slantyard!</div>{" "}
            <div>
            <Help />
              Here is an image with some helpful tips on how to nagivate
              around the app.{" "}
            </div>
            <div>
              On the top row there is a series of icons, from left to right they
              are:
              
                <a href="#!" onClick={()=>setSpotType(!spotType)}><p>Spot Type</p></a>
                
                  {spotType?(<p>
                    Shows you if this is a public of private spot. Public spots
                    are viewable to everyone, private ones must be shared with
                    you by whoever created the spot.
                  </p>):(<></>)}
                {" "}
               <a href="#!" onClick={()=>setSpotView(!spotView)}><p>View Spot</p></a>
                {spotView?(<p>Takes you to the spot, this will show you a map with the spot with a pin on it, as well as some details, pictures, and comments.</p>):(<></>)}
                <a href="#!" onClick={()=>setSpotUpload(!spotUpload)}><p>Upload Image</p></a>
                {spotUpload?(<p>This will take you to a page that will allow you to upload an image to that spot.</p>):(<></>)}
                <a href="#!" onClick={()=>setSpotLike(!spotLike)}><p>Like Spot</p></a>
                {spotLike?(<p>This will allow you to like the spot. So you can view it in your liked spots.</p>):(<></>)}
              
<Help2 />
<div>You can click the <i>Add Spot</i> button to add a new spot. It will start on whereever you are, so be sure to be near the spot you want to add.</div>
            </div>
            <div> To go view the spots go to the top, and select <i>Spots</i> then <i>All Spots</i>, or click <Link to="/spots">here</Link></div>
          </Col>
        
          <Col lg="4">
            <div className="confirmUserStyle">Updates</div>
            <div className="confirmUserStyle">Hello welcome to version 1.0. Stay tuned for more updates and features. Thanks!</div>
          </Col>
        </Row>
      </Container>
      </div>
    );
  } 

