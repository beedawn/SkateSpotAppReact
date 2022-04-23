import { onSnapshot, collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import loading from "../images/Loading_icon.gif";
import AuthContext from "../context/AuthContext";

import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

export default function Spots() {
  const { user } = useContext(AuthContext);
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  if (spots.length !== 0) {
    return (
      <div>
        <div className="globalTopMargin">
          {" "}
          <h2>Spots</h2>
        </div>
        {spots.map((spot) => (
          <div style={{ padding: "1rem 0", width: "400px", margin: "auto" }}>
            <Card>
              <div key={spot.id}>
                <CardHeader>
                  <Link to={"/spot/" + spot.id}>{spot.name}</Link>
                </CardHeader>
                <div
                  style={{
                    display: "block",
                    marginRight: "70%",
                    marginTop: "10px",
                  }}
                >
                  {user.email === spot.admin ? (
                    <Link to ={"/spot/" + spot.id +"/edit"}> <Button color="primary">
                      {" "}
                      Edit{" "}
                    </Button></Link>
                  ) : (
                    <p></p>
                  )}{" "}
                  <div style={{marginTop:"10px"}}>
                  <Link to={"/spot/" + spot.id + "/addComment/"}>
                    <Button>Comment</Button>
                  </Link>
                  </div>
                </div>

                <h6>{spot.location}</h6>

                <p>{spot.description}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Spots</h2>
        <div>
          <img src={loading} alt="Loading" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }
}
