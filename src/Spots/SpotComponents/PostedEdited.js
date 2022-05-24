import React from "react";
import Username from "./Username";
import '../../styles/style.css'

export default function PostedEdited(props) {
    const spot = props.spot;

  return (
    <div>
        {spot.edited === true ? (
          <p className="PostedEditedText">
            Edited on {spot.time} by <Username user={spot}/>
        </p>
        ) : (
          <></>
        )}{" "}
      <p className="PostedEditedText">
        Posted on {spot.timePosted} by <Username user={spot} />
        </p>
    </div>
  );
}
