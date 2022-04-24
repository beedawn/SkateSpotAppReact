import React, { useState, useContext } from "react";
import { Button } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { getStorage, ref, uploadBytes, listAll, list, getDownloadURL } from "firebase/storage";
import { Input } from "reactstrap";
import "../styles/style.css";
import {v4} from "uuid";
import { useParams } from "react-router-dom";

export default function AddSpot() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const [spotLocation, setSpotLocation] = useState("");
  const [spotName, setSpotName] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const handleNewSpot = async () => {
    await handleUpload();
    const collectionRef = collection(db, "spots");
    const payload = {
      name: spotName,
      location: spotLocation,
      description: spotDescription,
      admin: user.email,
    };
    await addDoc(collectionRef, payload);
    refreshPage();
  };

  const refreshPage = async () => {
    window.location.replace("/spots");
  };
  const handleUpload = () => {
    if(imageUpload == null) return;
    const imageRef = ref(storage, `images/${spot}/${v4() }`);
    uploadBytes(imageRef, imageUpload).then(()=>{
     alert("Image Uploaded");
    })
 
   };

  return (
    <div className="globalTopMargin">
      <h2>Add a Spot</h2>
      <div>
        <Input
          editable="true"
          placeholder="Spot Name"
          onChange={(event) => setSpotName(event.target.value)}
        />
      </div>
      {spotName ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter Spotname</span>
      )}
      <div style={{ marginTop: "1rem" }}>
        <Input
          editable="true"
          placeholder="Spot Location"
          onChange={(event) => setSpotLocation(event.target.value)}
        />
      </div>
      {spotLocation ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter Location</span>
      )}
      <div style={{ marginTop: "1rem" }}>
        <Input
          editable="true"
          placeholder="Description"
          type="textarea"
          onChange={(event) => setSpotDescription(event.target.value)}
        />
      </div>
      {spotDescription ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter Description</span>
      )}

<Input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(event)=> {setImageUpload(event.target.files[0])}}
        />
     
      <div style={{ marginTop: "1rem" }}>
        <div>
          {spotName && spotLocation && spotDescription ? (
            <Button color="primary" onClick={handleNewSpot}>
              Submit
            </Button>
          ) : (
            <p>
              Once you complete the required forms a submit button will appear
              here
            </p>
          )}
        </div>
        <div>
          <Button
            color="primary"
            onClick={() => {
              refreshPage();
            }}
          >
            {" "}
            Cancel{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
