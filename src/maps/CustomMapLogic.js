import React from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { refreshPage } from "../functions/Refresh";

export default function CustomMapLogic(props) {
  const { spot, handleDrag, center, spots, check } = props;

  const containerStyle = {
    width: "auto",
    height: "400px",
    margin: "auto",
  };
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const [map, setMap] = React.useState(null);
  switch (check) {
    default:
      break;
    case "1":
      return (
        //Return statement for add a spot
        <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onUnmount={onUnmount}
        >
             <Autocomplete
           
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              
            />
          </Autocomplete>
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
          
        </GoogleMap></div>
      );
    case "2":
      //Not sure if this ever returns
      return (<div>
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
              onClick={() => {
                refreshPage(spot.id);
              }}
            />
          ))}
        </GoogleMap></div>
      );

    case "3":
      //Return Statement for Single Spot
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
        </GoogleMap></div>
       
      );

    case "4":
  
      //Return statement for Spots Component and Dashboard
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
                  title={spot.name}
                  onClick={() => {
                    refreshPage(spot.id);
                  }}
                />
              ))}
            </GoogleMap></div>
      );

    case "5":
      // Return Statement for Add a Spot
      return (
        <div>
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
              onDragEnd={(e) => handleDrag(e)}
           
            
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
        </GoogleMap></div>
        
      );

    case "6":
      // Single Spot with all spots on
      return (<div>
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
        </div>
      );
  }
}
