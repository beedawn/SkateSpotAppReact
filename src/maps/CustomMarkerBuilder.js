import React from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { refreshPage } from "../functions/Refresh";
import useGeolocation from "react-hook-geolocation";
export default function CustomMarke1rBuilder(props) {

  const { spot, handleDrag } = props;
 
  const containerStyle = {
    width: "auto",
    height: "400px",
    margin: "auto",
  };
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const geolocation = useGeolocation();
  const center = {
    lat: geolocation.latitude,
    lng: geolocation.longitude,
  };
  const [map, setMap] = React.useState(null);
console.log(spot[0])
if(spot[0].edit){
  return(

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: spot[0].lat, lng: spot[0].long }}
      zoom={12}
      onUnmount={onUnmount}
    >
      {spot.map((spot) => (
        <Marker
          key={spot.id}
          position={{ lat: spot.lat, lng: spot.long }}
          draggable
          title="New Spot"
          onDragEnd={(e) => handleDrag(e)}
          onClick={() => {
            refreshPage(spot.id);
          }}
        />
      ))}
    </GoogleMap>
  )
}
  return (
    //Return statement for add a spot
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
          title="New Spot"
          onDragEnd={(e) => handleDrag(e)}
          
        />
      ))}
      
    </GoogleMap>:)
    </div>
  );
}
