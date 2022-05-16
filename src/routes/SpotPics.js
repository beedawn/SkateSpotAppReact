import React, { useState, useEffect, useContext } from "react";
import { db, storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { onSnapshot, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { refreshPage, imagePage } from "../functions/Refresh";
import Loading from "../graphics/Loading";

export default function SpotPics() {
  const { spot } = useParams();
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
    return <div><Loading /></div>;
  }
  return (
    <div>
      {filteredSpot.map((spot) => (
        <div key={spot.id}>
          {filteredSpot[0].images ? (
            filteredSpot[0].images.map((image) => {
              return (
                <div>
                  <div>
                    <Link to={"/spot/" + spot.id + "/deleteImage/" + image.id}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </Link>
                  </div>
                  <a href="#"><img alt={spot.name} src={image.url} style={{ height: "200px" }} onClick={()=> imagePage(image.url)}/></a>
                  <p>
                    Posted By: {image.displayName} on {image.time}
                  </p>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
}
