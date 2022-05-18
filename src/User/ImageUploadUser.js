import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { onSnapshot, collection } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Input } from "reactstrap";
import "../styles/style.css";
import { v4 } from "uuid";


export default function ImageUploadUser(props) {
  const handleUpload = props.handleUpload;
  const { user } = useContext(AuthContext);
  const vkey = v4();
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/users/" + user.photoURL + "/");

  const [imageUpload, setImageUpload] = useState(null);
  const [check, setCheck] = useState("true");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
console.log(user.email)
console.log(user)
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  // const handleUpload = () => {
  //   //  if(imageUpload.size > 500000){
  //   //      setCheck("false");
  //   //      return(
  //   //          console.log("File is too Large!")
  //   //      )
  //   //  }
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/users/${vkey}`);

  //   uploadBytes(imageRef, imageUpload).then(() => {
  //     window.location.replace(`/user/uploadConfirm/${vkey}`);
  //   });
  // };
  const imageSpot = imageList.filter((image) => {
    return image.search(vkey);
  });
  return (
    <div className="globalTopMargin">
      <div style={{ marginTop: "1rem" }}>
        
        <h3> Image Upload</h3>
        <Input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        {/* {check ? <div>File too large!</div> : <p></p>} */}
        <Button color="success" onClick={()=>handleUpload(imageUpload)}>
          Upload
        </Button>
      </div>
    </div>
  );
}
