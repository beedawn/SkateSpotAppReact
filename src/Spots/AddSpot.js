import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";

import "../styles/style.css";
import { v4 } from "uuid";
import useGeolocation from "react-hook-geolocation";
import Maps from "../maps/Maps";
import Geocode from "react-geocode";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";
import Select from 'react-select';
import { Form, Input, FormGroup, Label, Tooltip } from "reactstrap";
import {FaQuestionCircle} from 'react-icons/fa';



export default function AddSpot() {
  const spotId = v4();
  const geolocation = useGeolocation();

  const { user } = useContext(AuthContext);
  const [gps, setGps] = useState();
  const [spotLocation, setSpotLocation] = useState("");
  const [spotAddress, setSpotAddress] = useState("");
  const [spotCity, setSpotCity] = useState("");
  const [spotCountry, setSpotCountry ] = useState();
  const [spotName, setSpotName] = useState("");
  const [geo, setGeo] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [userArray, setUserArray] = useState([]);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
  const [spots, setSpots] = useState([]);
  const [tooltip, setTooltip]= useState(false);
  const [sharedUsers,setSharedUsers]= useState([]);
  const [toggleState, setToggleState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {

    onSnapshot(collection(db, "users"), (snapshot) => {
      setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsub;
  }, []);

  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("en");
  Geocode.setRegion("es");

  function fetchLocation(lat, long) {
    Geocode.fromLatLng(lat, long).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log(city, state, country);
        setSpotCity(city)
        setSpotAddress(address)
        setSpotCountry(country)
        setIsLoaded(true);
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
  }
if(!gps){
  fetchLocation( geolocation.latitude,
    geolocation.longitude);}

  const handleNewSpot = async () => {
    const collectionRef = collection(db, "spots");
    const date = new Date(Date.now());

    if(gps){
  fetchLocation( gps.lat, gps.long);
    const payload = {
      name: spotName,
      location: spotAddress,
      city: spotCity,
      country: spotCountry,
      description: spotDescription,
      admin: { email: user.email, name: user.displayName },
      images: [],
      time: date.toString(),
      timePosted: date.toString(),
      lat: gps.lat,
      long: gps.long,
      edited: false,
      users:[...sharedUsers],
      private:toggleState
    };
    console.log(payload)
    await addDoc(collectionRef, payload);
    refreshPage();
  }else{
  fetchLocation(geolocation.latitude,
    geolocation.longitude);
    const payload = {
      name: spotName,
      location: spotAddress,
      city: spotCity,
      country: spotCountry,
      description: spotDescription,
      admin: { email: user.email, name: user.displayName },
      images: [],
      time: date.toString(),
      timePosted: date.toString(),
      lat: geolocation.latitude,
                long: geolocation.longitude,
      edited: false,
      users:[...sharedUsers],
      private:toggleState
    };
    console.log(payload)
    await addDoc(collectionRef, payload);
    refreshPage();
  }
  };

  //Handle Drag is Passed to Maps Component
  function handleDrag(e) {
    setGps({ lat: e.latLng.lat(), long: e.latLng.lng() });
    fetchLocation(e.latLng.lat(), e.latLng.lng());
  }

  if (spots.length !== 0 ||spots!==[] )  {
    const filteredUserArray = userArray.map((user)=>{return({value:user.id, email: user.email, name:user.name, label:`${user.name} -  ${user.email}`})});
    console.log(filteredUserArray)
    console.log(sharedUsers)
    return (
      <div>
        <h2>Add a Spot</h2>
        {gps ? (
          <Maps
            spot={[{ lat: gps.lat, long: gps.long, id: spotId }]}
            spots={spots}
            handleDrag={handleDrag}
            drag={true}
            singleView={true}
          />
        ) : (
          <Maps
            spot={[
              {
                lat: geolocation.latitude,
                long: geolocation.longitude,
                id: spotId,
              },
            ]}
            spots={spots}
            handleDrag={handleDrag}
            drag={true}
          />
        )}
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

{toggleState ? (<Select placeholder="Add users you want to share this spot with" isMulti options={filteredUserArray} onChange={(e)=>(setSharedUsers(e))}/>):(<></>)}
        <div></div>
        <Form>
    <FormGroup switch="true" style={{width:"175px", margin:"auto"}}>
  
        <Input
      type="switch"
     onChange={()=>setToggleState(!toggleState)}
    />
  
    <Label switch="true" >Private Spot?</Label>  <Tooltip isOpen={tooltip} target="PrivateTooltip" toggle={()=>setTooltip(!tooltip)}>
         Check this slider to the right(turns blue), to set this as a private spot. If left unchecked, this will be a public spot available to all users.
        </Tooltip> <FaQuestionCircle id="PrivateTooltip" />
  </FormGroup>
  </Form>

        <div style={{ marginTop: "1rem" }}>
          { isLoaded ?  (<>{spotCity} {spotAddress}</>):(<>Loading Address...</>)}
          <div>
            {spotName && spotDescription ? (
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
  } else {
    return (
      <div>
        <h2>Add a Spot</h2>
        <Loading />
      </div>
    );
  }
}
