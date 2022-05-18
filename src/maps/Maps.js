import React, { useState } from "react";
import Switch from "../graphics/Switch";
import CustomMapLogic from "./CustomMapLogic";
import CustomMarkerBuilder from "./CustomMarkerBuilder";

import { useJsApiLoader } from "@react-google-maps/api";
// import useGeolocation from 'react-hook-geolocation';
import useGeolocation from "react-hook-geolocation";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS;

export default function Maps(props) {
  const geolocation = useGeolocation();
  const { spot, handleDrag, drag, coords, spots, allSpots } = props;
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
             <CustomMarkerBuilder spot={spot} handleDrag={handleDrag} />
              <Switch toggle={toggle} />1
            </div>
          );
        } else {
          /* Doubt this ever returns */
          return (
            <div>
           <CustomMarkerBuilder spot={spot} handleDrag={handleDrag} />
           2
              <Switch toggle={toggle} />
              <></>
            </div>
          );
        }
      } else if (coords === true) {
        /* return statement for Single Spot */
        return (
          <div>
            <CustomMapLogic
              spot={spot}
              center={{ lat: spot[0].lat, lng: spot[0].long }}
              handleDrag={handleDrag}
              drag={drag}
              check="3"
            />
            <Switch toggle={toggle} />
          </div>
        );
      } else {
        /* return statement for Spots component, and Dashboard */
       
       if(spot.length>1 ){
        return (
          <div>
            <CustomMapLogic
              spot={spot}
              center={center}
              handleDrag={handleDrag}
              drag={drag}
              check="4"
            />
          </div>
        
        );
      }else {
        return(
          <div>
          <CustomMapLogic
            spot={spot}
            center={{lat:spot[0].lat, lng:spot[0].long}}
            handleDrag={handleDrag}
            drag={drag}
            check="4"
          />
          <Switch toggle={toggle} />
        </div> )
       
      }
      }
    }
    if (drag && spots) {
      return (
        /* return statement for Add a Spot */
        <div>
          <CustomMapLogic
            spot={spot}
            spots={spots}
            center={{ lat: spot[0].lat, lng: spot[0].long }}
            handleDrag={handleDrag}
            drag={drag}
            check="5"
          />
          <Switch toggle={toggle} />
        </div>
      );
    } else {
      /*single Spot with all spots on */
      return (
        <div>
          <CustomMapLogic
            spot={spot}
            spots={spots}
            center={{ lat: spot[0].lat, lng: spot[0].long }}
            handleDrag={handleDrag}
            drag={drag}
            check="6"
          />
          <Switch toggle={toggle} />
        </div>
      );
    }
  } else {
    return <div> </div>;
  }
}
