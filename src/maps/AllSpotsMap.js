import React,{useState,useEffect } from 'react';
import Maps from './Maps';
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";


export default function AllSpotsMap(props){
    const spots = props.spots;
    // const [spots, setSpots] = useState([]);
    // useEffect(() => {
      
    //     // listAll(imageListRef).then((response) => {
    //     //   response.items.forEach((item) => {
    //     //     getDownloadURL(item).then((url) => {
    //     //       setImageList((prev) => [...prev, url]);
    //     //     });
    //     //   });
    //     // });
    
    //     // onSnapshot(collection(db, "comments"), (snapshot) => {
    //     //   setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     // });
    
    //     const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
    //       setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     });
    
    //     return unsub;
    //   }, []);
    
    
    return(<Maps spot={spots} check1="7" allspots="true" singleView={false} />)
}