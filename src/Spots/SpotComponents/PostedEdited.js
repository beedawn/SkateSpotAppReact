import React from "react";

export default function PostedEdited(props) {
    const spot = props.spot;
  return (
    <div>
      <p>
        {spot.edited === true ? (
          <>
            Edited on {spot.time} by {spot.admin.name}
          </>
        ) : (
          <></>
        )}{" "}
      </p>
      <p>
        Posted By {spot.admin.name} on {spot.timePosted}
      </p>
    </div>
  );
}
