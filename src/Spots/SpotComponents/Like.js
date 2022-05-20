import React, {useEffect, useState, useContext} from 'react';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import AuthContext from "../../context/AuthContext";
import { onSnapshot, collection,setDoc, doc } from "firebase/firestore";
import { db } from '../../firebase-config';
export default function Like(props){
    const { user } = useContext(AuthContext);
    const spot = props.spot;
    const [userArray, setUserArray] = useState([]);
    useEffect(()=>{
    onSnapshot(collection(db, "users"), (snapshot) => {
        setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    },[]);
const userDb = userArray.filter((person)=>{return user.photoURL===person.id});

const editLike = async() =>{
    const docRef = doc(db, "users", userDb[0].id);
    if(userDb[0].likedSpots===undefined){
    const payload = {
        ...userDb[0],
        likedSpots: [spot.id]
    }
    await setDoc(docRef, payload);
}else{
    
    const payload = {
        ...userDb[0],
        likedSpots: [...userDb[0].likedSpots,spot.id]
    }
    await setDoc(docRef, payload);

}
}

const determineLike = () => {
    if(userDb.likedSpots === undefined){
return false;
}else {
    const likes = userDb[0].likedSpots.filter((item)=> {
        return item.id=spot.id;
            })
           
}
console.log(userDb[0])
}

determineLike();
if(userDb[0].likedSpots===undefined){
    return(
        <div>
        <FaRegHeart />
        
            </div>
    )
}
if(userDb[0].likedSpots.filter((item)=> {
    return item.id=spot.id;
        })){
return(
    <div>
<FaHeart />

    </div>
)}else{
    return(
    <div>
    <FaRegHeart />
    
        </div>)
}

}