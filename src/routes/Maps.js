import React from "react";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import useGeolocation from 'react-hook-geolocation';


const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
const containerStyle = {
  width: "400px",
  height: "400px",
};



export default function Maps(props) {
  const spot = props.spot
  
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

 
  const center = {
    lat: spot[0].lat,
    lng: spot[0].long,
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
console.log(spot)
  return isLoaded ? (spot[0].name ? (
    <div>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {spot.map((spot)=>(
        
      <Marker
      key={spot.id}
        position={{lat:spot.lat, lng:spot.long}}
        title={"Pizza"}
        onClick={() => {
          alert(spot.lat);
        }}
      />))}
      <></>
    </GoogleMap>
  </div>
  ) : (
    <div>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {spot.map((spot)=>(
        
      <Marker
      key={spot.id}
        position={{lat:spot.lat, lng:spot.long}}
        title={"Pizza"}
        draggable
        onClick={() => {
          alert(spot.lat);
        }}
      />))}
      <></>
    </GoogleMap>
  </div>
  )):(<></>);
}
