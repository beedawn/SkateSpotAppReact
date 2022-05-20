import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { onSnapshot, collection } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Input } from "reactstrap";
import "../styles/style.css";



export default function ImageUploadUser(props) {
  const handleUpload = props.handleUpload;
  const skipImageUpload = props.skipImageUpload;
  const { user } = useContext(AuthContext);

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

  return (
    <div className="globalTopMargin">
      <div style={{ marginTop: "1rem" }}>
        
        <h3>Profile Picture Upload</h3>
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
        <Button color="primary" onClick={skipImageUpload}>
          Skip
        </Button>
        <Button color="success" onClick={()=>handleUpload(imageUpload)}>
          Upload
        </Button>
      </div>
    </div>
  );
}
