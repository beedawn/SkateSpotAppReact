import React, {useEffect, useState, useContext} from 'react';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import AuthContext from "../../context/AuthContext";
import { onSnapshot, collection,setDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase-config';
export default function Like(props){
    const { user } = useContext(AuthContext);
    const spot = props.spot;
    const [userArray, setUserArray] = useState([]);
    const [addLike, setAddLike] = useState(false);
    const [isLoaded, setIsLoaded] = useState();
    useEffect(()=>{
    onSnapshot(collection(db, "users"), (snapshot) => {
        setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoaded(true);
      });
    },[]);
const userDb =userArray.filter((person)=>{return user.photoURL===person.id});

const editLike = async() =>{
    const docRef = doc(db, "users", userDb[0].id);
    if(userDb[0].likedSpots===undefined){
    const payload = {
        ...userDb[0],
        likedSpots: [spot.id]
    }
    setAddLike(userDb[0].likedSpots.includes(spot.id));
    await setDoc(docRef, payload)
  
}if(userDb[0].likedSpots.includes(spot.id)){
const newArray = 
userDb[0].likedSpots.filter((item)=>{return item!==spot.id});
const payload = {
    ...userDb[0],
    likedSpots: [...newArray]
}
await setDoc(docRef, payload)
setAddLike(false);
}else{
    const payload = {
        ...userDb[0],
        likedSpots: [...userDb[0].likedSpots,spot.id]
    }
    await setDoc(docRef, payload);
    setAddLike(false);
}
}
const determineLike = () => {
    editLike();
}
    return (!isLoaded)?(<>Loading</>):(<><div>{addLike || userDb[0].likedSpots.includes(spot.id)  ? <FaHeart onClick={determineLike}/> : <FaRegHeart onClick={determineLike}/>}</div> </>)
 
}


