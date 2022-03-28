import React, { useContext } from "react";
import NavBar from "./navigation/NavBar";
import AuthContext from "./context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (<div><NavBar /> <div>Welcome {user.displayName} </div></div>);
}
