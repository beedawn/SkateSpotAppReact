import React, { useState, useContext } from "react";
import { Button } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { getStorage, ref, uploadBytes, listAll, list, getDownloadURL } from "firebase/storage";
import { Input } from "reactstrap";
import "../styles/style.css";
import {v4} from "uuid";
import { useParams } from "react-router-dom";
import useGeolocation from 'react-hook-geolocation';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


export default function AddSpot() {

  const geolocation = useGeolocation();
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const [spotLocation, setSpotLocation] = useState("");
  const [spotName, setSpotName] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const handleNewSpot = async () => {
    await handleUpload();
    const collectionRef = collection(db, "spots");
    const payload = {
      name: spotName,
      location: spotLocation,
      description: spotDescription,
      admin: user.email,
    };
    await addDoc(collectionRef, payload);
    uploadPage();
  };

  const uploadPage = async () => {
    window.location.replace("/spots/");
  };
  const handleUpload = () => {
    if(imageUpload == null) return;
    const imageRef = ref(storage, `images/${spot}/${v4() }`);
    uploadBytes(imageRef, imageUpload).then(()=>{
     alert("Image Uploaded");
    })
 
   };

  return (
    <div className="globalTopMargin">

{ !geolocation.error
    ? (
      <ul>
        <li>Latitude:          {geolocation.latitude}</li>
        <li>Longitude:         {geolocation.longitude}</li>
        <li>Location accuracy: {geolocation.accuracy}</li>
        <li>Altitude:          {geolocation.altitude}</li>
        <li>Altitude accuracy: {geolocation.altitudeAccuracy}</li>
        <li>Heading:           {geolocation.heading}</li>
        <li>Speed:             {geolocation.speed}</li>
        <li>Timestamp:         {geolocation.timestamp}</li>
      </ul>
    )
    : (
      <p>No geolocation, sorry.</p>
    )}
      
      <h2>Add a Spot</h2>
      <div>
        <Input
          editable="true"
          placeholder="Spot Name"
          onChange={(event) => setSpotName(event.target.value)}
        />
      </div>
      {spotName ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter Spotname</span>
      )}
      <div style={{ marginTop: "1rem" }}>
        <Input
          editable="true"
          placeholder="Spot Location"
          onChange={(event) => setSpotLocation(event.target.value)}
        />
      </div>
      {spotLocation ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter Location</span>
      )}
      <div style={{ marginTop: "1rem" }}>
        <Input
          editable="true"
          placeholder="Description"
          type="textarea"
          onChange={(event) => setSpotDescription(event.target.value)}
        />
      </div>
      {spotDescription ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter Description</span>
      )}


      <div style={{ marginTop: "1rem" }}>
        <div>
          {spotName && spotLocation && spotDescription ? (
            <Button color="primary" onClick={handleNewSpot}>
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
              uploadPage();
            }}
          >
            {" "}
            Cancel{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
