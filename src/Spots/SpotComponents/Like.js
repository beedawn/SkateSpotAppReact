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
    console.log("undefined ok")
}if(userDb[0].likedSpots.includes(spot.id)){
console.log("already in array")
const newArray = 
userDb[0].likedSpots.filter((item)=>{return item!==spot.id});
const payload = {
    ...userDb[0],
    likedSpots: [...newArray]
}
await setDoc(docRef, payload)
console.log(userDb[0].likedSpots)
console.log(newArray)
setAddLike(false);
console.log(addLike);
console.log(userDb)
}else{
    
    const payload = {
        ...userDb[0],
        likedSpots: [...userDb[0].likedSpots,spot.id]
    }
    console.log("Added to likedSpot Array")
    await setDoc(docRef, payload);
    setAddLike(true);
    console.log(addLike)

}
}

const determineLike = () => {
    editLike();

}



console.log(isLoaded)

    return (!isLoaded)?(<>Loading</>):(<><div>{addLike || userDb[0].likedSpots.includes(spot.id)  ? <FaHeart onClick={determineLike}/> : <FaRegHeart onClick={determineLike}/>}</div> </>)
  
        

        
    
    
    // else{
// if(userDb[0].likedSpots.includes(spot.id)){
//     return(
//         <div>
//         <FaHeart onClick={determineLike}/>
//         hh
//             </div>
//     )
//     }
// else{
// return(
//     <div>
// <FaHeart onClick={determineLike}/>
// aa
//     </div>
// )}
}


