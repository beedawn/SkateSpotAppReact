import React, { useState, useEffect } from "react";
import Maps from "./Maps";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";

export default function AllSpotsMap(props) {
  const spots = props.spots;

  return <Maps spot={spots} check1="7" allspots="true" singleView={false} />;
}
