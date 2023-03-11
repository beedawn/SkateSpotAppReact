import React from "react";
import Login from "./login/Login";
import "./styles/style.css";

export default function Main() {
  const queryString = window.location.search.substring(1).split("|")

  console.log(queryString);

  return (
    <div className="mainDiv">
      <Login queryString={queryString} />
      
    </div>
  );
}
