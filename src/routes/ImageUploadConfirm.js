import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import Comment from "../comments/Comment";
import { Link } from "react-router-dom";


export default function ImageUploadConfirm() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  console.log(spot);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, ('images/' + spot + '/'));
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    listAll(imageListRef).then((response)=>{
      response.items.forEach((item)=> {
          getDownloadURL(item).then((url) => {
              setImageList((prev)=> [...prev, url]);
             
          })
      })
      

})



    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;


  }, []);
  // filter spot
  const filteredSpot = spots.filter((el) => {
    return el.id === spot;
  });
  const handleEdit = async (id, url) => {
    const docRef = doc(db, "spots", id);
    console.log(filteredSpot)
  
    const payload = {
      name: filteredSpot[0].name,
      location: filteredSpot[0].location,
      description: filteredSpot[0].description,
      id: filteredSpot[0].id,
      admin: filteredSpot[0].admin,
      images:[...filteredSpot[0].images, ...imageList ]
    };
    console.log(filteredSpot[0].images)
    await setDoc(docRef, payload);
  
  
     window.location.replace(`/spot/${spot}`);
    
  };


  if (filteredSpot.length === 0) {
    return <div>404 Error - Not Found</div>;
  }

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        {" "}
        <h2>Confirm Image Upload</h2>
      </div>
      {filteredSpot.map((spot) => (
        <div style={{ padding: "1rem 0" }}>
             
          <div key={spot.id}>
          <h4>{spot.name}</h4>
              
    
       <div><img alt={imageList[imageList.length-1]} src={imageList[imageList.length-1] } style={{height:"200px"}}/></div>
       
               
           
            
            <div>
              </div>
            <div>
           
                <div>
              
                  <Button color="primary" onClick={() => handleEdit(spot.id)}>
                    {" "}
                    Confirm Upload{" "}
                  </Button>
             
                   
                   </div>
            
          
            </div>
     
          </div>
        </div>
      ))}
   
      <div>
      <a href="/spots/">Back to Spots</a>
      </div>
    </div>
  );
}
