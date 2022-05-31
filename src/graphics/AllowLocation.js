import React from "react";
import allowLocation from "../images/AllowLocation.png";
export default function Help() {
  return (
    <div>
      <div>
        <a href={allowLocation}>
          <img
            style={{ width: "100%", maxWidth:"300px", borderRadius: "15px" }}
            src={allowLocation}
            alt="HelpImg"
          />
        </a>
      </div>
    </div>
  );
}
