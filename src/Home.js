import React, { useContext } from "react";
import NavBar from "./navigation/NavBar";
import AuthContext from "./context/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Spots from "./routes/Spots";
import Dashboard from "./routes/Dashboard";
import Main from "./Main";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (<div><NavBar /> <Routes>
  
  <Route path="/" element={<Dashboard />} />
  <Route path="/spots" element={<Spots />} />
  
</Routes></div>);
}
