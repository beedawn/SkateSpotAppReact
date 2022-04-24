import React, { useState, useContext } from "react";
import { Button } from "reactstrap";
import { storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { ref, uploadBytes } from "firebase/storage";
import { Input } from "reactstrap";
import "../styles/style.css";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

export default function ImageUpload() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);

  const [imageUpload, setImageUpload] = useState(null);

 
 const handleUpload = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${spot}/${v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("Image Uploaded");
      window.location.replace(`/spot/${spot}/`);
    });
   
  };

  return (
    <div className="globalTopMargin">
      <div style={{ marginTop: "1rem" }}>
        <Input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />

        <div style={{ marginTop: "1rem" }}>
          <div>
            <Button color="primary" onClick={handleUpload}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
