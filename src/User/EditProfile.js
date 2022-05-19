import React, { useEffect, useState, useContext } from "react";
import DisplayNameSetup from "../login/DisplayNameSetup";
import ImageUploadUser from "../User/ImageUploadUser";
import ImageUploadConfirmUser from "./ImageUploadConfirmUser";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { doc, collection, addDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification } from "firebase/auth";
import ConfirmUser from "./ConfirmUser";
import { v4 } from "uuid";
import { Button, Input } from "reactstrap";
import { auth } from "../firebase-config";

export default function EditProfile(props) {
const [userArray,setUserArray]=useState([]);
const { user, setUser } = useContext(AuthContext);

//need to build out the ConfirmUser Component again


    useEffect(() => {

        const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
          setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
      
        return unsub;
      }, []);
    

      const filteredUserArray = userArray.filter((userSingle)=>{return userSingle.myid===user.photoURL});
    const signedIn = props.signedIn;
   console.log(filteredUserArray)
    const [addDb, setAddDb] = useState(false);
    const [addImage, setAddImage] = useState(false);
    const [imageConfirm, setImageConfirm] = useState(false);
    const [email, setEmail] = useState();

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
    console.log(user.displayName);
    const editEmail = async () => {
        await newEmail();
        const docRef = doc(db, "users", filteredUserArray[0].myid);
const payload = {
    ...filteredUserArray[0],
    email: user.email
}
await setDoc(docRef, payload);

    }

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
        setAddDb(true);
        await emailVerify();
        await newEmail();
        await updateUserId(payload.id);
        await addDoc(collectionRef, payload);

    };
    console.log(auth.currentUser);
    const emailVerify = async () => {
        sendEmailVerification(auth.currentUser).then(() => {
            //email verification sent!
            console.log("email sent")
        })
    }
    const newEmail = async () => {
        updateEmail(auth.currentUser, email).then(() => {
            // Email updated!
            // ...
        }).catch((error) => {
            // An error occurred
            console.log(error)
        });
    }

    const updateUserId = async (id) => {
        try {
            const update = {
                ...user,
                photoURL: vkey2
            }

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

    function toggle() {
        setImageConfirm(true);
    }
    console.log(user.emailVerified)

    if (!imageConfirm) {
        if (!addImage) {
            if (!addDb) {

                return (<div>
                    {/* if user is not in database, show this component */}
                    <div>
                        <p>Does your email look good?</p>
                        <Input defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} />
                        <Button color="danger">Start Over</Button>
                        {signedIn ?(<Button color="primary" onClick={editEmail}>Confirm</Button>):(<Button color="primary" onClick={handleNewUser}>Confirm</Button>)}
                    </div>
                </div>)
            }
            if (user.emailVerified) {
                if (addDb) {
                    {/* if user is in database, but has no images in there image array, show this */ }
                    return (<ImageUploadUser handleUpload={handleUpload} />)
                }
            } else {
                return (<div>Please check your email for the verification link, once that is clicked, you will be able to proceed.</div>)
            }
        } if (addImage) {
            return (
                <div>
                    {/* else show display name setup */}
                    {/* <DisplayNameSetup /> */}
                    <ImageUploadConfirmUser toggle={toggle} vkey={vkey} />
                </div>
            )
        }
        


    }else {
        return (
            <div>
                {/* else show display name setup */}
                <DisplayNameSetup />

            </div>)
    }
}