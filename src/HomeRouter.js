import React from "react";
import NavBar from "./navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import Spots from "./routes/Spots";
import Dashboard from "./routes/Dashboard";

import AddSpot from "./routes/AddSpot";
import Account from "./routes/Account";
import {SingleSpot} from "./routes/SingleSpot"
export default function Home() {

  return (
    <div>
      <NavBar />{" "}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/spots" element={<Spots />} />
        <Route path="/addspot" element={<AddSpot />} />
        <Route path="/account" element={<Account />} />
         <Route
          path="/spot/:s" element={
          // render={(props) => ( 
           <SingleSpot
              // spotid={props.match.params.s}
            />
          // {/* ) */}
          }
        />

<Route path="/spot/:spot" render={(props) => (<SingleSpot spotId={props} />)} />
      </Routes>
    </div>
  );
}
