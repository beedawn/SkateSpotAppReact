import React from "react";
import Username from "./Username";
import {FaUserCircle} from 'react-icons/fa';

export default function PostedEdited(props) {
    const spot = props.spot;
  return (
    <div>
     
        {spot.edited === true ? (
          <p>
            Edited on {spot.time} by {spot.admin.name}  {spot.images[spot.images.length-1] ? ( <img src={spot.images[spot.images.length-1].url} alt="Avatar" height="25px" />):(<><FaUserCircle /></>)}
        </p>
          
        ) : (
          <></>
        )}{" "}
     
      <p>
        Posted on {spot.timePosted} by {spot.admin.name} <Username spot={spot} />
        </p>
      
    </div>
  );
}
