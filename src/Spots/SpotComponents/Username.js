import React from 'react';
import {FaUserCircle} from 'react-icons/fa';

export default function Username(props){
    const spot = props.spot;
   
return(
    <>{spot.images[spot.images.length-1] !== undefined ? ( <img src={spot.images[spot.images.length-1].url} alt="Avatar" height="25px" />):(<><FaUserCircle /></>)}
    </>)}