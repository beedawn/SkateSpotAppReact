import React, {useContext, useEffect, useState} from 'react';
import AllSpotsMap from "../maps/AllSpotsMap";
import { Button, Card, CardHeader, Col, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Maps from "../maps/Maps";
import PostedEdited from "./SpotComponents/PostedEdited";
import AuthContext from "../context/AuthContext";
import { onSnapshot, collection } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import Like from './SpotComponents/Like';
import '../styles/style.css';
import {FaCameraRetro} from 'react-icons/fa';
export default function SpotsRender(props){
const { user } = useContext(AuthContext);
const [comments, setComments] = useState([]);
    const spots=props.spots;

    useEffect(()=>{
        onSnapshot(collection(db, "comments"), (snapshot) => {
            setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
    },[])
    return(
        <div>
        <div>
          <Row><Col><AllSpotsMap spots={spots} sm="12" /></Col></Row>

        </div><Row>
        {spots.map((spot) => (
          <div style={{ padding: "1rem 0", width: "400px", margin: "auto" }} key={spot.id}>
            <Card>
              <div >
                <CardHeader>
                {spot.private?(<h6>Private Spot</h6>):(<><h6>Public Spot</h6></>)}
                  <Link to={"/spot/" + spot.id}><h5>{spot.name}</h5></Link>
                  <h6>{spot.city}, {spot.state}</h6>
                  <Like spot={spot}/>
       
                </CardHeader>

                <div
                  style={{
                    display: "inline",
                    marginRight: "auto",
                    marginTop: "10px",
                  }}
                  
                > 
                  {user.email === spot.admin.email ? (
                    <Row><Link to={"/spot/" + spot.id + "/edit"}>
                      {" "}
                      <Button color="primary"> Edit </Button>
                    </Link></Row>
                  ) : (
                    <p></p>
                  )}{" "}
                  <Row><Col>
                    <Link to={"/spot/" + spot.id + "/addComment/"}>
                      <Button className="spotButton">Comment</Button>
                    </Link>
                 
                    <Link to={"/spot/" + spot.id + "/upload"}>
                      <Button className="spotButton" color="success" onClick={() => {}}>
                         <FaCameraRetro />
                      </Button>
                    </Link></Col>
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
                <PostedEdited spot={spot} />
            
            </Card>
          </div>
        ))}</Row>
        </div>
        )
}