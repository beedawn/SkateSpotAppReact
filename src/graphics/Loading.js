import React from "react";
import loading from "../images/skateboard.png";
import "../styles/style.css";
export default function Loading() {
  return (
<div class="loader-container">
   
   <div class="loader"><img class="skateicon" src={loading} alt="skateboard"/></div><div class="loading">Loading</div>
 </div>
  );
}
