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
const [check, setCheck] =useState("true");
 
 const handleUpload = () => {
    //  if(imageUpload.size > 500000){
    //      setCheck("false");
    //      return(
    //          console.log("File is too Large!")
    //      )
    //  }
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${spot}/${v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("Image Uploaded");
      console.log(imageUpload);
     window.location.replace(`/spot/${spot}/`);
    });
   
  };

 
  return (
    <div className="globalTopMargin">
      <div style={{ marginTop: "1rem" }}>
        <h2> Spot {spot}</h2><h3> Image Upload</h3>
            <Input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
            />
        </div>
       
        <div style={{ marginTop: "1rem" }}>
            {check ? (<div>File too large!</div>) : (<p></p>)
              
    
      
}
<Button color="primary" onClick={handleUpload}>
                  Submit
                </Button></div>
    </div>
  );
}