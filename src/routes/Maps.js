import React, { useState } from "react";

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

  if (isLoaded) {
    if (drag) {
      return (
        /* return statement for Add a Spot */
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
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
                  alert(spot.lat);
                }}
              />
            ))}
            <></>
          </GoogleMap>
         
        </div>
      );
    } else if (coords === true) {
      /* return statement for Single Spot */
      console.log(spot)
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
                title={"Pizza"}
                onClick={() => {
                  alert(spot.lat);
                }}
              />
            ))}
          </GoogleMap>
          
        </div>
      );
    } else {
      /* return statement for Spots component, and Dashboard */
      return (
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            {spot.map((spot) => (
              <Marker
                key={spot.id}
                position={{ lat: spot.lat, lng: spot.long }}
                title={"Pizza"}
                onClick={() => {
                  alert(spot.lat);
                }}
              />
            ))}
          </GoogleMap>
          
        </div>
      );
    }
  } else {
    return <div> Hello</div>;
  }
}
