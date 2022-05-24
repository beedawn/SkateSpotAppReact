
import React, { useState, useEffect } from "react";
import {FaUserCircle} from 'react-icons/fa';
import { Link } from "react-router-dom";
import Loading from '../../graphics/Loading';
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase-config"

export default function Username(props){
    const user = props.user;


    const [userArray, setUserArray] = useState([]);

    useEffect(()=>{
        onSnapshot(collection(db, "users"), (snapshot) => {
            setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
    })
    const filteredUser = userArray.filter(function (el) {
        return el.id === user.admin.id;
      });
 if(filteredUser[0]!==undefined){
return(
    <><Link to={"/users/" + user.admin.id}>{user.admin.name}</Link> {filteredUser[0].images[filteredUser[0].images.length-1] !== undefined ? ( <img src={filteredUser[0].images[filteredUser[0].images.length-1].url} alt="Avatar" height="25px" />):(<><FaUserCircle /></>)}
    </>)}else{
        return(
            <><Loading /></>
        )
    }
}