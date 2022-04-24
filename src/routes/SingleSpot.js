import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../firebase-config";
import { getStorage, ref, uploadBytes, listAll, list, getDownloadURL } from "firebase/storage";
import { onSnapshot, collection } from "firebase/firestore";
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

      
  // filter products
  const filteredProduct = spots.filter(function (el) {
    return el.id === spot;
  });

  if (filteredProduct.length === 0) {
    return <div>404 Error - Not Found</div>;
  }

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        {" "}
        <h2>Spots</h2>
      </div>
      {filteredProduct.map((spot) => (
        <div style={{ padding: "1rem 0" }}>
          <div key={spot.id}>
          {imageList.map((url)=>{
          return <img src={url} style={{height:"200px"}}/>
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
