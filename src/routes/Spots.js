import {
  onSnapshot,
  collection,
} from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { db, storage } from "../firebase-config";
import loading from "../images/Loading_icon.gif";
import AuthContext from "../context/AuthContext";
import {
  ref,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
} from "reactstrap";

export default function Spots() {
  const { spot } = useParams();
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/" + spot + "/");
  const { user } = useContext(AuthContext);
  const [spots, setSpots] = useState([]);
  const [comments, setComments ] = useState([]);
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

 
    return unsub;

    // const unsub1 = onSnapshot(collection(db, "comments"), (snapshot) => {
    //   setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
    // return unsub1;

  }, []);


  if (spots.length !== 0) {
 
    return (
      <div>
        <div className="globalTopMargin">
          {" "}
          <h2>Spots</h2>
        </div>
        {/* {console.log(imageList)}
        {spot ? (<div>text</div>):(<div>fail</div>)} */}

        {spots.map((spot) => (
       
          <div style={{ padding: "1rem 0", width: "400px", margin: "auto" }}>
            <Card>
              <div key={spot.id}>
                <CardHeader>
                  <Link to={"/spot/" + spot.id}>{spot.name}</Link>
                </CardHeader>
                <div
                  style={{
                    display: "block",
                    marginRight: "70%",
                    marginTop: "10px",
                  }}
                >
                 
                  {user.email === spot.admin.email ? (
                    <Link to={"/spot/" + spot.id + "/edit"}>
                      {" "}
                      <Button color="primary"> Edit </Button>
                    </Link>
                  ) : (
                    <p></p>
                  )}{" "}
                  <div style={{ marginTop: "10px" }}>
                    <Link to={"/spot/" + spot.id + "/addComment/"}>
                      <Button>Comment</Button>
                    </Link>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Link to={"/spot/" + spot.id + "/upload"}>
                      <Button color="success" onClick={() => {}}>
                        Upload
                      </Button>
                    </Link>
                  </div>
                </div>

                <h6>{spot.location}</h6>
                <p>{spot.description}</p>
                <p>{spot.edited === true ? (<>Posted</>) : (<>Edited</>)} By {spot.admin.name} on {spot.time}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Spots</h2>
        <div>
          <img src={loading} alt="Loading" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }
}
