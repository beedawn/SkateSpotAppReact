import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { collection, addDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { Input } from "reactstrap";
import "../styles/style.css";
import { v4 } from "uuid";
import useGeolocation from "react-hook-geolocation";
import Maps from "./Maps";
import Geocode from "react-geocode";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";

export default function AddSpot() {
  const spotId = v4();
  const geolocation = useGeolocation();

  const { user } = useContext(AuthContext);
  const [gps, setGps] = useState();
  const [spotLocation, setSpotLocation] = useState("");
  const [spotAddress, setSpotAddress] = useState("");
  const [spotCity, setSpotCity] = useState("");
  const [spotName, setSpotName] = useState("");
  const [geo, setGeo] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsub;
  }, []);

  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("en");
  Geocode.setRegion("es");

  function fetchLocation() {
    Geocode.fromAddress(spotLocation.address + " " + spotLocation.city).then(
      (response) => {
        const location = response.results[0].geometry.location;
        setGeo(location);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function fetchCoords() {
    Geocode.fromLatLng(gps.lat, gps.long).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
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
              default:
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const handleNewSpot = async () => {
    const collectionRef = collection(db, "spots");
    const date = new Date(Date.now());
    const payload = {
      name: spotName,
      location: spotAddress + " " + spotCity,
      description: spotDescription,
      admin: { email: user.email, name: user.displayName },
      images: [],
      time: date.toString(),
      timePosted: date.toString(),
      lat: gps.lat,
      long: gps.long,
      edited: false,
    };
    await addDoc(collectionRef, payload);
    console.log(collectionRef);
    refreshPage();
  };

  function handleChange(e) {
    const value = e.target.value;
    setSpotLocation({
      ...spotLocation,
      [e.target.name]: value,
    });
    fetchLocation();
    //  fetchCoords(gps.lat,gps.long);
  }

  //Handle Drag is Passed to Maps Component
  function handleDrag(e) {
    setGps({ lat: e.latLng.lat(), long: e.latLng.lng() });
  }

  if (spots.length !== 0) {
    return (
      <div>
        <h2>Add a Spot</h2>
        {gps ? (
          <Maps
            spot={[{ lat: gps.lat, long: gps.long, id: spotId }]}
            spots={spots}
            handleDrag={handleDrag}
            drag={true}
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
          {gps ? (
            <></>
          ) : (
            <div>
              <Input
                editable="true"
                name="address"
                placeholder="Spot Address"
                onChange={handleChange}
              />
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
            </div>
          )}
        </div>
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
