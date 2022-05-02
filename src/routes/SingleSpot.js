import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import Comment from "../comments/Comment";
import { Link } from "react-router-dom";


export default function SingleSpot() {
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

  const handleEdit = async (id, url) => {
    const docRef = doc(db, "spots", id);
    console.log(docRef.name)
    const payload = {
      name: docRef.name,
      location: docRef.location,
      description: docRef.description,
      admin: user.email,
      images:[...docRef.images, {url}]
    };
    await setDoc(docRef, payload);
    
  };
  // filter spot
  const filteredSpot = spots.filter((el) => {
    return el.id === spot;
  });

  if (filteredSpot.length === 0) {
    return <div>404 Error - Not Found</div>;
  }
  console.log(imageList)
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        {" "}
        <h2>Spots</h2>
      </div>
      {filteredSpot.map((spot) => (
        <div style={{ padding: "1rem 0" }}>
          <div key={spot.id}>
          {imageList.map((url)=>{
              console.log(url)
              
          return <Button onClick={()=>{handleEdit(spot.id, url)} }>Hi</Button>
      })}  {imageList.map((url)=>{
    
        <img src={url} style={{height:"200px"}}/>
    
})}
               
            <h4>{spot.name}</h4>
            <h5>{spot.location}</h5>
            <div>
              {user.email === spot.admin ? (
                <div>
                <Link to={"/spot/" + spot.id + "/edit"}>
                  <Button color="primary" onClick={() => {}}>
                    {" "}
                    Edit{" "}
                  </Button>
                </Link>
                   <Link to={"/spot/" + spot.id + "/delete"}>
                   <Button color="danger" className="adminButtonsEach" onClick={()=>{}}>Delete</Button>
                   
                   </Link>
                   <Link to={"/spot/" + spot.id + "/upload"}>
                   <Button color="success" className="adminButtonsEach" onClick={()=>{}}>Upload</Button>
                   
                   </Link>
                   </div>
              ) : (
                <p></p>
              )}
            </div>
            
            <p>{spot.description}</p>
          </div>
        </div>
      ))}
      <a href="/spots/">Back to Spots</a>
      <Comment />
      <div>
      <a href="/spots/">Back to Spots</a>
      </div>
    </div>
  );
}
