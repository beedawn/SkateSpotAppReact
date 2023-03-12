import React, { useEffect, useState, useContext } from "react";
import DisplayNameSetup from "../login/DisplayNameSetup";
import ImageUploadUser from "../User/ImageUploadUser";
import ImageUploadConfirmUser from "./ImageUploadConfirmUser";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import {
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import ConfirmUser from "./ConfirmUser";
import { v4 } from "uuid";
import { Button, Input } from "reactstrap";
import { auth } from "../firebase-config";

export default function EditProfile(props) {
  const [userArray, setUserArray] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, [user]);
  const filteredUserArray = userArray.filter((userSingle) => {
    return userSingle.myid === user.photoURL;
  });
  const signedIn = props.signedIn;
  const [addDb, setAddDb] = useState(false);
  const[bailout,setBailout]=useState(false);
  const [addImage, setAddImage] = useState(false);
  const [imageConfirm, setImageConfirm] = useState(false);
  const [email, setEmail] = useState();
  const vkey2 = v4();
  const [vkeyState, setVkeyState] = useState(vkey2);
  const vkey = v4();
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
      window.location.replace(`/edit/${vkey}`);
    });
  };
  const editEmail = async (e) => {
    await newEmail(e);
    const docRef = doc(db, "users", filteredUserArray[0].myid);
    const payload = {
      ...filteredUserArray[0],
      email: e,
    };
    await setDoc(docRef, payload);
    setAddDb(true);
  };
  const handleNewUser = async (email) => {
    const collectionRef = collection(db, "users");
    const date = new Date(Date.now());
    const payload = {
      myid: vkey2,
      email: email,
      images: [""],
      likedSpots: [""],
      joined: date.toString(),
      edited: false,
    };
    setAddDb(true);
    // await emailVerify();
    await newEmail(email);
    await updateUserId(payload.id);
    await addDoc(collectionRef, payload);
  };
  const skipImageUpload = () => {
    setImageConfirm(true);
  };
  const emailVerify = async () => {
    sendEmailVerification(auth.currentUser).then(() => {
      //email verification sent!
      console.log("email sent");
    });
  };
  const newEmail = async (email) => {
    updateEmail(auth.currentUser, email)
      .then(() => {
        // Email updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  };
  const updateUserId = async (id) => {
    try {
      const update = {
        ...user,
        photoURL: vkey2,
      };
      updateProfile(auth.currentUser, update);
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  function toggle() {
    setImageConfirm(true);
  }
  if (!imageConfirm) {
    if (!addImage) {
      if (!addDb) {
        return (
          <div>
            {/* if user is not in database, show this component */}
            <ConfirmUser
              editEmail={editEmail}
              signedIn={signedIn}
              handleNewUser={handleNewUser}
            />
          </div>
        );
      }
      if (user.emailVerified) {
        if (addDb) {
        /* if user is in database, but has no images in there image array, show this */
          return (
            <ImageUploadUser
              handleUpload={handleUpload}
              skipImageUpload={skipImageUpload}
            />
          );
        }
      } 
      else if(bailout){
        return (
          <ImageUploadUser
            handleUpload={handleUpload}
            skipImageUpload={skipImageUpload}
          />
        );
      }
      else {
       console.log(addDb)
        emailVerify();
        return (
          <div>
            Please check your email for the verification link, once that is
            clicked, you will be able to proceed.
            <div>
              <Button onClick={emailVerify}>Send Again</Button>{" "}
              <Button onClick={() => window.location.reload(true)}>
                Click Here After Verification
              </Button>
              <Button onClick={()=>{setBailout(true)}}>Stuck</Button>
            </div>
          </div>
        );
      }
    }
    if (addImage) {
      return <ImageUploadConfirmUser toggle={toggle} vkey={vkeyState} />;
    }
  } else {
    return <DisplayNameSetup />;
  }
}
