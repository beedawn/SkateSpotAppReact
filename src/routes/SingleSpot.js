import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { onSnapshot, collection } from "firebase/firestore";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import Comment from "../comments/Comment";
import { Link } from "react-router-dom";
import SpotPics from "./SpotPics";
import Maps from "./Maps";
import Loading from "../graphics/Loading";

export default function SingleSpot() {
  const { spot } = useParams();
  const { user } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/" + spot + "/");
  const [spots, setSpots] = useState([]);
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
  }, []);
  // filter spot
  const filteredSpot = spots.filter((el) => {
    return el.id === spot;
  });

  if (filteredSpot.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {filteredSpot.map((spot) => (
        <div>
          <div key={spot.id}>
            <Maps
              style={{ height: "200px" }}
              spot={filteredSpot}
              spots={spots}
              singleView={true}
            />
            <h4>{spot.name}</h4>
            <h5>{spot.location}</h5>
            {filteredSpot[0].images.length === 0 ? (
              <div>Add a picture?</div>
            ) : (
              <SpotPics />
            )}
            <div>
              <Link to={"/spot/" + spot.id + "/addComment/"}>
                <Button>Comment</Button>
              </Link>
              <Link to={"/spot/" + spot.id + "/upload"}>
                <Button
                  color="success"
                  className="adminButtonsEach"
                  onClick={() => {}}
                >
                  Upload
                </Button>
              </Link>{" "}
            </div>
            <div>
              Originally posted by {spot.admin.name} on {spot.timePosted}
            </div>
            <div>
              {spot.edited === true ? (
                <>
                  Edited by {spot.admin.name} on {spot.time}{" "}
                </>
              ) : (
                <></>
              )}
            </div>

            <div></div>
            <div>
              {user.email === spot.admin.email ? (
                <div>
                  <Link to={"/spot/" + spot.id + "/edit"}>
                    <Button color="primary" onClick={() => {}}>
                      {" "}
                      Edit{" "}
                    </Button>
                  </Link>
                  <Link to={"/spot/" + spot.id + "/delete"}>
                    <Button
                      color="danger"
                      className="adminButtonsEach"
                      onClick={() => {}}
                    >
                      Delete
                    </Button>
                  </Link>
                  <Link to={"/spot/" + spot.id + "/upload"}>
                    <Button
                      color="success"
                      className="adminButtonsEach"
                      onClick={() => {}}
                    >
                      Upload
                    </Button>
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
