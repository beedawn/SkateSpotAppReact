import React, { useState, useContext, useEffect } from "react";
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
import Maps from './Maps';
import Geocode from "react-geocode";
import { refreshPage } from "../functions/Refresh";
import { confirmPasswordReset } from "firebase/auth";


export default function AddSpot() {
const spotId = v4();
  const geolocation = useGeolocation();
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const [gps, setGps]=useState();
  const [spotLocation, setSpotLocation] = useState("");
  const [spotAddress, setSpotAddress] = useState("");
  const [spotCity, setSpotCity] = useState("");
  const [spotName, setSpotName] = useState("");
  const [geo, setGeo] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("en");
  Geocode.setRegion("es");
  
  useEffect(()=> {
    if(gps){
      console.log(gps)
    }
    
  })


 function fetchLocation() { Geocode.fromAddress(spotLocation.address + " " + spotLocation.city).then(
    (response) => {
      const location = response.results[0].geometry.location;
      setGeo(location)
      
      
    },
    (error) => {
      console.error(error);
    }
    
  );}

  const handleNewSpot = async () => {
    const collectionRef = collection(db, "spots");
    const date = new Date(Date.now());
    const payload = {
      name: spotName,
      location: spotAddress + " " + spotCity,
      description: spotDescription,
      admin: {email: user.email, name:user.displayName},
      images:[],
      time: date.toString(),
      timePosted: date.toString(),
      lat:geo.lat,
      long:geo.lng,
      edited:false,
    };
    await addDoc(collectionRef, payload);
    console.log(collectionRef);
    // refreshPage();
  };



    function handleChange (e){
      
     const value = e.target.value;
     setSpotLocation({
       ...spotLocation, [e.target.name]: value
     });
     fetchLocation()
   }
   //Handle Drag is Passed to Maps Component
 function handleDrag (e){
  setGps({lat: e.latLng.lat(), long:e.latLng.lng()});
  const lat = e.latLng.lat(); 
  const lng = e.latLng.lng();

  

   }

  return (
    <div className="globalTopMargin">
      <h2>Add a Spot</h2>
      {gps===false ? (<Maps spot={[{lat:geolocation.latitude,long:geolocation.longitude}]}  handleDrag={handleDrag} />): (<Maps spot={[{lat:gps.lat,long:gps.long}]}  handleDrag={handleDrag} />)}
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
          name="address"
          placeholder="Spot Address" 
          onChange={handleChange}
        />
      </div>
      {spotAddress ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter Address</span>
      )}
        <div style={{ marginTop: "1rem" }}>
        <Input
          editable="true"
          name="city"
          placeholder="Spot City" 
          onChange={handleChange}
        />
      </div>
      {spotCity ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter City</span>
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
          {spotName  && spotDescription ? (
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
              refreshPage();
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
