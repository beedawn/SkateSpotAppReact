import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Maps from "./Maps";
import useGeolocation from 'react-hook-geolocation';
import { v4 } from "uuid";

export default function Dashboard() {

  const { user } = useContext(AuthContext);
  const geolocation = useGeolocation();

  return (
    <div>
      <Maps spot={[{lat:geolocation.latitude, long:geolocation.longitude, id:v4()}]} undrag={true}/>
        <div>Logo</div>
        <div>Welcome {user.displayName}</div>
        <div>New spots</div> <div>Updates</div>{" "}
      </div>
  
  
    
  );
}
