import React, {useContext, useEffect, useState} from 'react';
import AllSpotsMap from "../maps/AllSpotsMap";
import { Button, Card, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Maps from "../maps/Maps";
import PostedEdited from "./SpotComponents/PostedEdited";
import AuthContext from "../context/AuthContext";
import { onSnapshot, collection } from "firebase/firestore";
import { db, storage } from "../firebase-config";
export default function SpotsRender(props){
    const { user } = useContext(AuthContext);

const [comments, setComments] = useState([]);
    const spots=props.spots;

    useEffect(()=>{
        onSnapshot(collection(db, "comments"), (snapshot) => {
            setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
    })
    return(
        <div>
        <div>
    <AllSpotsMap spots={spots}  />
        </div>
        {spots.map((spot) => (
          <div style={{ padding: "1rem 0", width: "400px", margin: "auto" }}>
            <Card>
              <div key={spot.id}>
                <CardHeader>
                  <Link to={"/spot/" + spot.id}>{spot.name}</Link>
                </CardHeader>
                <Maps spot={[spot]} spots={spots} center={{lat:spot.lat,lng:spot.long}} singleView={true} />
                <div
                  style={{
                    display: "inline",
                    marginRight: "auto",
                    marginTop: "10px",
                  }}
                >
                  {user.email === spot.admin.email ? (
                    <Link to={"/spot/" + spot.id + "/edit"}>
                      {" "}
                      <Button color="primary"> Edit </Button>
                    </Link>
                  ) : (
                    <p></p>
                  )}{" "}
                  <div style={{ marginTop: "10px" }}><div style={{marginLeft:"0px"}}>
                    <Link to={"/spot/" + spot.id + "/addComment/"}>
                      <Button>Comment</Button>
                    </Link>
                    </div>
                    <Link to={"/spot/" + spot.id + "/upload"}>
                      <Button color="success" onClick={() => {}}>
                        Upload
                      </Button>
                    </Link>
                  </div>
                </div>

                <h6>{spot.location}</h6>
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
              </div>
            </Card>
          </div>
        ))}</div>
        )
}