import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../firebase-config";
import { ref, listAll, getDownloadURL,  deleteObject, } from "firebase/storage";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";

export default function ImageUploadConfirmUser(props) {
 const vkey = props.vkey;
 const toggle = props.toggle;
  const { spot, id } = useParams();
  const { user } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/users/"+ user.photoURL + "/" );
  const [users, setUsers] = useState([]);
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);
  // filter user

  const filteredUser = users.filter((el) => {
    return el.myid=== user.photoURL;
  });
  console.log(user.id)
  console.log(filteredUser)
  const arrayPush = (array) => {
    const date = new Date(Date.now());
    array.push({
      id: vkey,
      url: imageList[imageList.length - 1],
      time: date.toString(),
    });
    return array;
  };
  const imageArrayHandler = (filteredUser) => {
    if (filteredUser[0].images.length>0) {
      const arrayImg = [...filteredUser[0].images];
      return arrayPush(arrayImg);
    } else {
      const arrayImg = [];
      return arrayPush(arrayImg);
    }
  };
  if(filteredUser.length!==0){
  for(let i = 0; i < filteredUser[0].images.length-1;i++){
console.log(filteredUser[0].images[i].id)}}

  const handleEdit = async (id) => {
    const imageKeys=[];
    for(let i = 0; i < filteredUser[0].images.length-1;i++){
      imageKeys.push(`images/users/${filteredUser[0].id}/${filteredUser[0].images[i].id}`)
      const imageRef = ref(storage, imageKeys[i]);
      console.log(imageKeys)
   console.log(`images/users/${filteredUser[0].id}/${filteredUser[0].images[i].id}`);
      deleteObject(imageRef)
    .then(() => {
      console.log(imageRef)
    })
    .catch((error) => {
      console.log(error);
    });
  }


    const docRef = doc(db, "users", id);
    console.log(filteredUser);
    const date = new Date(Date.now());
    const payload = {
  ...filteredUser[0],
      images: imageArrayHandler(filteredUser),
      time: date.toString(),
    };

    await setDoc(docRef, payload);
    toggle();
  };
console.log(filteredUser);
console.log(imageList)
console.log(user.email)
  if (filteredUser.length === 0) {
    return <div><Loading /></div>;
  }
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <h2>Confirm Profile Picture Upload</h2>
      </div>
      {filteredUser.map((image) => (
        <div style={{ padding: "1rem 0" }}>
          <div key={image.id}>
            
            <div>
              <img
                alt={imageList[imageList.length - 1]}
                src={imageList[imageList.length - 1]}
                style={{ height: "200px" }}
              />
            </div>
            <div>
              <div>
                <Button color="primary" onClick={() => handleEdit(image.id)}>
                  {console.log(image.id)}
                  {" "}
                  Confirm Upload{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>
      </div>
    </div>
  );
}
