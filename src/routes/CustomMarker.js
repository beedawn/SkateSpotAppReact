import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { refreshPage } from "../functions/Refresh";

export default function CustomMarker(props) {
  const spot = props.spot;
  const handleDrag = props.handleDrag;
  const drag = props.drag;
  const center = props.center;
  const spots = props.spots;
  const containerStyle = {
    width: "auto",
    height: "400px",
    margin: "auto",
  };
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const [map, setMap] = React.useState(null);
  if (drag) {
    return (
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
              refreshPage(spot.id);
            }}
            
          />
        ))}
        
        
      </GoogleMap>
    );
  }
if (drag && spots) {
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
    </GoogleMap>;
  } else {
    return (
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
        
      </GoogleMap>
    );
  }
}
