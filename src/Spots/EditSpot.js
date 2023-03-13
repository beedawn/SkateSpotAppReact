import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";
import { Form, Input, FormGroup, Label, Tooltip, Row, Col } from "reactstrap";
import { FaQuestionCircle } from "react-icons/fa";

import "../styles/style.css";
import SpotPics from "./SpotComponents/SpotPics";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";
import Maps from "../maps/Maps";
import Select from "react-select";
import Geocode from "react-geocode";
import useGeolocation from "react-hook-geolocation";

export default function EditSpot() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("en");
  Geocode.setRegion("es");
  const geolocation = useGeolocation();
  const { spot } = useParams();
  const [tooltip, setTooltip] = useState(false);
  const [userArray, setUserArray] = useState([]);
  const [toggleState, setToggleState] = useState(false);
  const [spotName, setSpotName] = useState("");
  const [spotAddress, setSpotAddress] = useState("");
  const [spotCity, setSpotCity] = useState("");
  const [spotCountry, setSpotCountry] = useState();
  const [spotState, setSpotState] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [spotDescription, setSpotDescription] = useState("");
  const [spots, setSpots] = useState([]);
  const [gps, setGps] = useState();
  const [sharedUsers, setSharedUsers] = useState([]);
  const [load, isLoad] = useState(false);

  useEffect(async () => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    if (filteredSpots[0] !== undefined) {
      setSpotName(filteredSpots[0].name);
      setSpotDescription(filteredSpots[0].description);
      setSharedUsers(filteredSpots[0].users);
    }
  }, [load]);

  const filteredSpots = spots.filter(function (el) {
    return el.id === spot;
  });

  function fetchLocation(lat, long) {
    Geocode.fromLatLng(lat, long).then(
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
            }
          }
        }
        console.log(city, state, country);
        setSpotCity(city);
        setSpotAddress(address);
        setSpotCountry(country);
        setSpotState(state);
        setIsLoaded(true);
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  if (!gps && filteredSpots[0]!== undefined) {
    fetchLocation(filteredSpots[0].lat, filteredSpots[0].long);
  }

  const handleEdit = async (id) => {
    if (gps) {
      const docRef = doc(db, "spots", id);
      const date = new Date(Date.now());
      const payload = {
        ...filteredSpots[0],
        name: spotName,
        location: spotAddress?spotAddress:'',
        city: spotCity?spotCity:'',
        country: spotCountry?spotCountry:'',
        state: spotState?spotState:'',
        description: spotDescription,
        time: date.toString(),
        edited: true,
        lat: gps.lat,
        long: gps.long,
        users: sharedUsers,
        private: toggleState,
      };
      await setDoc(docRef, payload);
      refreshPage();
    } else {
      const docRef = doc(db, "spots", id);
      const date = new Date(Date.now());
      const payload = {
        ...filteredSpots[0],
        name: spotName,
        location: spotAddress?spotAddress:'',
        city: spotCity?spotCity:'',
        country: spotCountry?spotCountry:'',
        state: spotState?spotState:'',
        description: spotDescription,
        time: date.toString(),
        edited: true,
        users: sharedUsers,
        private: toggleState,
      };
      await setDoc(docRef, payload);
      refreshPage();
    }
  };

  //Handle Drag is Passed to Maps Component
  function handleDrag(e) {
    setGps({ lat: e.latLng.lat(), long: e.latLng.lng() });
    fetchLocation(e.latLng.lat(), e.latLng.lng());
  }

  if (filteredSpots.length === 0) {
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  } else {
    const anotherArray = userArray.map((user) => {
      return {
        value: user.id,
        email: user.email,
        name: user.name,
        label: `${user.name} -  ${user.email}`,
      };
    });
    const filteredUserArray = anotherArray.filter((user) => {
      return user.name !== undefined;
    });
    return (
      <div onMouseOver={() => isLoad(true)}>
        {gps ? (
          <Maps
            spot={[
              {
                edit: true,
                lat: gps.lat,
                long: gps.long,
                id: filteredSpots[0].id,
              },
            ]}
            spots={spots}
            handleDrag={handleDrag}
            drag={true}
            singleView={true}
          />
        ) : (
          <Maps
            spot={[
              {
                edit: true,
                lat: filteredSpots[0].lat,
                long: filteredSpots[0].long,
                id: filteredSpots[0].id,
              },
            ]}
            spots={spots}
            handleDrag={handleDrag}
            drag={true}
            singleView={true}
          />
        )}
        <h2>Edit a Spot</h2>

        <Row>
          <SpotPics edit={true} />
        </Row>
        <Form onSubmit={(event)=>{event.preventDefault();handleEdit(spot);}}>
        <div className="spotEditDiv">
          {filteredSpots.map((spot) => (
            <div className="globalTopMargin" key={spot.id}>
              <label>Spot Name:</label>
              <Input
                value={spotName}
                onChange={(event) => setSpotName(event.target.value)}
              />
            </div>
          ))}
          {spotName ? (
            <p></p>
          ) : (
            <span className="errorSpan">Please update Spotname</span>
          )}

          {filteredSpots.map((spot) => (
            <div style={{ marginTop: "1rem" }}>
            
              <label>Spot Description:</label>
              <Input
                editable="true"
                value={spotDescription}
                type="textarea"
                onChange={(event) => setSpotDescription(event.target.value)}
              />
              {spotDescription ? (
                <p></p>
              ) : (
                <span className="errorSpan">Please update Description</span>
              )}

              <div>
                <label>
                  If this is a private spot, select users to share with. (You
                  can add more than 1.)
                </label>
                <Select
                  isMulti
                  options={filteredUserArray}
                  onChange={(e) => setSharedUsers(e)}
                  value={sharedUsers}
                />
              </div>

       
            
                <FormGroup
                  switch="true"
                  style={{ width: "175px", margin: "auto" }}
                >
                  <Input
                    type="switch"
                    onChange={() => setToggleState(!toggleState)}
                  />
                  <Label switch="true">Private Spot?</Label>{" "}
                  <Tooltip
                    isOpen={tooltip}
                    target="PrivateTooltip"
                    toggle={() => setTooltip(!tooltip)}
                  >
                    Check this slider to the right(turns blue), to set this as a
                    private spot. If left unchecked, this will be a public spot
                    available to all users.
                  </Tooltip>{" "}
                  <FaQuestionCircle id="PrivateTooltip" />
                </FormGroup>
             
            </div>
          ))}

          <div style={{ marginTop: "1rem" }}>
            {isLoaded ? (
              <>
                {spotCity} {spotAddress}
              </>
            ) : (
              <>Loading Address...</>
            )}

            <div>
              {spotName && spotDescription ? (
                <Button type="submit" color="primary" onClick={(event) =>{event.preventDefault(); handleEdit(spot);}}>
                  Submit
                </Button>
              ) : (
                <p>
                  Once you complete the required forms a submit button will
                  appear here
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
        </Form>
      </div>
    );
  }
}
