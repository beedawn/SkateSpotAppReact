import React from "react";
import loading from "../images/Loading_icon.gif";
import "../styles/style.css";
export default function Loading() {
  return (
    <div className="loading">
      <div>
        <img style={{ height: "200px" }} src={loading} alt="Loading" />
      </div>
      <>Loading...</>
    </div>
  );
}
