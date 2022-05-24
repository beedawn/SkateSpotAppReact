import React from "react";
import Username from "./Username";


export default function PostedEdited(props) {
    const spot = props.spot;

  return (
    <div>
        {spot.edited === true ? (
          <p>
            Edited on {spot.time} by <Username user={spot}/>
        </p>
        ) : (
          <></>
        )}{" "}
      <p>
        Posted on {spot.timePosted} by <Username user={spot} />
        </p>
    </div>
  );
}
