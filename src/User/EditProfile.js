import React, { useEffect, useState, useContext } from "react";
import DisplayNameSetup from "../login/DisplayNameSetup";
import ImageUploadUser from "../User/ImageUploadUser";
import ImageUploadConfirmUser from "./ImageUploadConfirmUser";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import ConfirmUser from "./ConfirmUser";
import { v4 } from "uuid";
import { Button, Input } from "reactstrap";
import { auth } from "../firebase-config";

export default function EditProfile() {
    const [userList, setUserList] = useState([]);
const [addDb, setAddDb]=useState(false);
const [addImage, setAddImage]=useState(false);
const [imageConfirm, setImageConfirm]=useState(false);

    const { user, setUser } = useContext(AuthContext);
    const vkey = v4();
    const vkey2 = v4();
    const [next, setNext] = useState();
    const handleUpload = (imageUpload) => {
        //  if(imageUpload.size > 500000){
        //      setCheck("false");
        //      return(
        //          console.log("File is too Large!")
        //      )
        //  }

        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/users/${user.photoURL}/${vkey}`);

        uploadBytes(imageRef, imageUpload).then(() => {
            setAddImage(true);
        });
    };
    
    const handleNewUser = async () => {
       
        const collectionRef = collection(db, "users");
        const date = new Date(Date.now());
        
        const payload = {
            myid: vkey2,
            email: user.email,
            images: [],
            joined: date.toString(),
            edited: false,
        };
        setAddDb("true");
        await updateUserId(payload.id);
        await addDoc(collectionRef, payload);
       
    };

    const updateUserId = async (id) => {
        try {
          const update = {
            ...user,
        photoURL:vkey2}
    
          updateProfile(auth.currentUser, update);
          onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            
          });
    
          console.log(update)
          console.log(user.email)
        } catch (error) {
          console.log(error.message);
        }
        
      };

    function toggle(){
        setImageConfirm(true);
    }
   if(!imageConfirm){
    if(!addImage){
    if (!addDb)
        return (<div>
            {/* if user is not in database, show this component */}
            <div>
                <p>Does your email look good?</p>
                <p>{user.email}</p>
                <Button color="danger">Start Over</Button>
                <Button color="primary" onClick={handleNewUser}>Confirm</Button>
            </div>
        </div>)
       if(addDb){
        {/* if user is in database, but has no images in there image array, show this */}
       return( <ImageUploadUser handleUpload={handleUpload}/>)}
    }
    if(addImage)  {
        return (
            <div>
                {/* else show display name setup */}
                {/* <DisplayNameSetup /> */}
                <ImageUploadConfirmUser toggle={toggle} vkey={vkey} />
            </div>
        )
    }
}
else{
    return (
        <div>
            {/* else show display name setup */}
            <DisplayNameSetup />
            
        </div>)
}
}