import React, {useContext, useEffect, useState} from 'react';
import AllSpotsMap from "../maps/AllSpotsMap";
import { Button, Card, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Maps from "../maps/Maps";
import PostedEdited from "./SpotComponents/PostedEdited";
import AuthContext from "../context/AuthContext";
import { onSnapshot, collection } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import Like from './SpotComponents/Like';
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
    <AllSpotsMap spots={spots}  />
        </div>
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
        ))}
        </div>
        )
}