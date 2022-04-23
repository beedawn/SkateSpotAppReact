import React, { useState, useContext } from "react";
import { Button, Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import  "../styles/style.css";


export default function AddComment() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);

  const [userComment, setUserComment] = useState("");
  const [userTitle, setUserTitle] = useState("");

  const allInputs = {imgUrl:''};
  const [imageAsFile, setImageAsFile] = useState("");
  const[imageAsUrl, setImageAsUrl] = useState(allInputs);

  console.log(imageAsFile)
  const handleImageAsFile = (e) => {
       const image = e.target.files[0]
       setImageAsFile(imageFile => (image))
   }
 


  const handleNewComment = async () => {
    const collectionRef = collection(db, "comments");
    const payload = {
      spot: spot,
      name: user.displayName,
      title: userTitle,
      comment: userComment,
      admin: user.email,
      image:[{...imageAsFile}]
    };
    await addDoc(collectionRef, payload);
    refreshPage();
  };

  const refreshPage = async () => {
    window.location.replace("/spot/" + spot + "/");
  };

  return (
    <div style={{ padding: "1rem 0", width:"500px", margin:"auto"}}>
        <Card>
      <CardHeader>Add a Comment  <div style={{display:"inline", marginLeft:"55%"}}>
          {" "}
          <Button
            color="primary"
            onClick={() => {
              refreshPage();
            }}
          >
            {" "}
            Close
            {" "}
          </Button>
        </div></CardHeader>

      <div>
        <input
          editable="true"
          placeholder="Title of Comment"
          onChange={(event) => setUserTitle(event.target.value)}
        />
        
      </div>
      {userTitle ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter a Title</span>
      )}
      <div style={{ marginTop: "1rem" }}>
        <textarea
          editable="true"
          placeholder="Comment"
          height="50"
          onChange={(event) => setUserComment(event.target.value)}
        />
      </div>
      {userComment ? (
        <p></p>
      ) : (
        <span className="errorSpan">Please enter a Comment</span>
      )}
      <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
      <button>Upload</button>
      <div style={{ marginTop: "1rem" }}>
        <div>
          {" "}
          {userComment && userTitle ? (
            <Button color="primary" onClick={handleNewComment}>
              Submit
            </Button>
          ) : (
            <p>
              Once you complete the required forms a submit button will appear
              here
            </p>
          )}
        </div>
       
        
      </div>
      </Card>
    </div>
    
  );
}
