import React, { useState } from "react";
import { refreshPage } from "../functions/Refresh";
import { Form, Input, FormGroup, Label } from "reactstrap";
import Switch from "../graphics/Switch";
import CustomMarker from "./CustomMarker";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import useGeolocation from 'react-hook-geolocation';
import useGeolocation from "react-hook-geolocation";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
const containerStyle = {
  width: "auto",
  height: "400px",
  margin: "auto",
};

export default function Maps(props) {
  const geolocation = useGeolocation();
  const spot = props.spot;
  const handleDrag = props.handleDrag;
  const drag = props.drag;
  const coords = props.singleView;
  const spots = props.spots;
  const [toggleState, setToggleState] = useState("false");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const center = {
    lat: geolocation.latitude,
    lng: geolocation.longitude,
  };

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function toggle() {
    setToggleState(!toggleState);
  }
  if (isLoaded) {
    if (toggleState) {
      if (drag) {
        if (spots) {
          return (
            /* return statement for Add a Spot */
            <div>
             <CustomMarker spot={spot} center={{ lat: spot[0].lat, lng: spot[0].long }}handleDrag={handleDrag} drag={drag}/>
              <Switch toggle={toggle} />
            </div>
          );
        } else {
          /* Doubt this ever returns */
          return (
            <div>
              
             <CustomMarker spot={spot} center={{ lat: spot[0].lat, lng: spot[0].long }}handleDrag={handleDrag} drag={drag}/>
              <Switch toggle={toggle} />
            </div>
          );
        }
      } else if (coords === true) {
        /* return statement for Single Spot */
        return (
          <div>
            <CustomMarker spot={spot}  center={{ lat: spot[0].lat, lng: spot[0].long }} handleDrag={handleDrag} drag={drag}/>
            <Switch toggle={toggle} />
          </div>
        );
      } else {
        /* return statement for Spots component, and Dashboard */
        return (
          <div>

<CustomMarker spot={spot} center={center} handleDrag={handleDrag} drag={drag}/>
             
           
          </div>
        );
      }
    }
    if (drag && spots) {
      return (
        /* return statement for Add a Spot */
        <div>
          <CustomMarker spot={spot} center={center} handleDrag={handleDrag} drag={drag}/>
             
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat:spot[0].lat,lng:spot[0].long}}
            zoom={12}
            onUnmount={onUnmount}
          >
            {spot.map((spot) => (
              <Marker
                key={spot.id}
                position={{ lat: spot.lat, lng: spot.long }}
                draggable
                onDragEnd={(e) => handleDrag(e)}
                onClick={() => {
                  refreshPage(spot.id);
                }}
              />
            ))}
            {spots.map((spot) => (
              <Marker
                key={spot.id}
                position={{ lat: spot.lat, lng: spot.long }}
                title={spot.name}
                onClick={() => {
                  refreshPage(spot.id);
                }}
              />
            ))}
            <></>
          </GoogleMap>
          <Switch toggle={toggle} />
        </div>
      );
    } else {
      /*single Spot with all spots on */
      return (
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: spot[0].lat, lng: spot[0].long }}
            zoom={12}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            {spot.map((spot) => (
              <Marker
                key={spot.id}
                position={{ lat: spot.lat, lng: spot.long }}
                title={spot.name}
                onClick={() => {
                  refreshPage(spot.id);
                }}
              />
            ))}
            {spots.map((spot) => (
              <Marker
                key={spot.id}
                position={{ lat: spot.lat, lng: spot.long }}
                title={spot.name}
                onClick={() => {
                  refreshPage(spot.id);
                }}
              />
            ))}
          </GoogleMap>
          <Switch toggle={toggle} />
        </div>
      );
    }
  } else {
    return <div> Hello you shouldn't be here.</div>;
  }
}
