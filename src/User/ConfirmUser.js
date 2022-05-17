// import React, {useContext,useState } from 'react';
// import AuthContext from "../context/AuthContext";
// import { Button, Input } from "reactstrap";
// import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
// import { collection, addDoc, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase-config";
// import { auth } from "../firebase-config";
// import {v4} from 'uuid';
// export default function ConfirmUser() {
//     const { user, setUser } = useContext(AuthContext);
//   const [userState, setUserState ] = useState();
//  const vkey=v4();
//   const updateDisplayName = async () => {
//     try {
//       const update = {
//         ...user,
//         id:vkey
//         };

//       updateProfile(auth.currentUser, update);
//       onAuthStateChanged(auth, (currentUser) => {
//         setUser(currentUser);
        
//       });

   
//     } catch (error) {
//       console.log(error.message);
//     }
    
//   };

//     const handleNewUser = async () => {
//         await updateDisplayName();
//         const collectionRef = collection(db, "users");
//         const date = new Date(Date.now());
        
//         const payload = {
//             id:user.id,
//             email: user.email,
//             images: [],
//             joined: date.toString(),
//             edited: false,
//         };
        
//      await addDoc(collectionRef, payload);
        
//     };
//     return (
//         <div>
//             <p>Does your email look good?</p>
//             <Input defaultValue={user.email} onChange={(e)=>(setUserState(e.target.value))} />
//             <Button color="primary" onClick={ handleNewUser }>Confirm</Button>
//         </div>
//     )
// }