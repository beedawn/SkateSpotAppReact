import React from "react";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import useGeolocation from 'react-hook-geolocation';


const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
const containerStyle = {
  width: "400px",
  height: "400px",
};



export default function Maps(props) {
  const lat = props.lat;
  const long = props.long;
  
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

 
  const center = {
    lat: lat,
    lng: long,
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

  return isLoaded ? (
    <div>{console.log(apiKey)}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker
          position={center}
          title={"Pizza"}
          onClick={() => {
            alert(center.lat);
          }}
        />
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
