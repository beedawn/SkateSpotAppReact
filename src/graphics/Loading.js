
import React from "react";
import loading from "../images/Loading_icon.gif";

export default function Loading() {
  return (
      <div>
    <div>
    <img src={loading} alt="Loading" />
  </div>
  <p>Loading...</p>
  </div>
  );
}
