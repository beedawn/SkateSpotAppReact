import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import "../styles/style.css";
import SpotPics from "./SpotPics";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";

export default function EditSpot() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const [spotLocation, setSpotLocation] = useState("");
  const [spotName, setSpotName] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const filteredSpots = spots.filter(function (el) {
    return el.id === spot;
  });

  const handleEdit = async (id) => {
    const docRef = doc(db, "spots", id);
    const date = new Date(Date.now());
    const payload = {
      ...filteredSpots[0],
      name: spotName,
      location: spotLocation,
      description: spotDescription,
      admin: { email: user.email, name: user.displayName },
      time: date.toString(),
      edited: true,
    };
    await setDoc(docRef, payload);
    refreshPage();
  };

  if (filteredSpots.length === 0) {
    return <div> <Loading /></div>;
  } else {
    return (
      <div className="globalTopMargin">
        <h2>Edit a Spot</h2>
        <SpotPics />
        {filteredSpots.map((spot) => (
          <div className="globalTopMargin">
            <Input
              defaultValue={spot.name}
              onChange={(event) => setSpotName(event.target.value)}
            />
          </div>
        ))}
        {spotName ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please enter Spotname</span>
        )}
        {filteredSpots.map((spot) => (
          <div style={{ marginTop: "1rem" }}>
            <Input
              editable="true"
              defaultValue={spot.location}
              onChange={(event) => setSpotLocation(event.target.value)}
            />
          </div>
        ))}
        {spotLocation ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please enter Location</span>
        )}
        {filteredSpots.map((spot) => (
          <div style={{ marginTop: "1rem" }}>
            <Input
              editable="true"
              defaultValue={spot.description}
              type="textarea"
              onChange={(event) => setSpotDescription(event.target.value)}
            />
          </div>
        ))}
        {spotDescription ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please enter Description</span>
        )}
        <div style={{ marginTop: "1rem" }}>
          <div>
            {spotName && spotLocation && spotDescription ? (
              <Button color="primary" onClick={() => handleEdit(spot)}>
                Submit
              </Button>
            ) : (
              <p>
                Once you complete the required forms a submit button will appear
                here
              </p>
            )}
          </div>
          <div>
            <Button
              color="primary"
              onClick={() => {
                refreshPage();
              }}
            >
              {" "}
              Cancel{" "}
            </Button>
            <Link to={"/spot/" + spot + "/delete"}>
              <Button
                color="danger"
                className="adminButtonsEach"
                onClick={() => {}}
              >
                Delete
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
