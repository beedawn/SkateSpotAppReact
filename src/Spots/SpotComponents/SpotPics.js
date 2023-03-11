import React, { useState, useEffect, useContext } from "react";
import { db, storage } from "../../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { onSnapshot, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { refreshPage, imagePage } from "../../functions/Refresh";
import Loading from "../../graphics/Loading";
import "../../styles/style.css";
import { Button, Row, Col } from "reactstrap";
import AuthContext from "../../context/AuthContext";
import LazyLoad from "react-lazyload";

export default function SpotPics(props) {
  const edit = props.edit;
  const { user } = useContext(AuthContext);
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
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      {filteredSpot.map((spot) => (
        <div key={spot.id} style={{ margin: "auto" }}>
          <Row style={{ margin: "auto" }}>
            {console.log(filteredSpot)}
            {filteredSpot[0].images ? (
              filteredSpot[0].images.map((image) => {
                return (
                  <>
                    {edit !== undefined ? (
                      <Col xl="4" lg="6" sm="12">
                        <div className="spotPicContainer" key={image.id}>
                          <LazyLoad>
                            <div className="imgDelete">
                              {image.email === user.email ? (
                                <Link
                                  to={
                                    "/spot/" +
                                    spot.id +
                                    "/deleteImage/" +
                                    image.id +
                                    "/"
                                  }
                                >
                                  <Button color="danger">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-trash"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                      />
                                    </svg>
                                  </Button>
                                </Link>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="spotPictureRenderContainer">
                              <a href="#!">
                                <img
                                  src={image.url}
                                  className="spotPictureRender"
                                  onClick={() => imagePage(image.url)}
                                  alt="Delete"
                                />
                              </a>
                            </div>

                            <div className="imagePosted">
                              Posted By: {image.displayName} on {image.time}
                            </div>
                          </LazyLoad>
                        </div>
                      </Col>
                    ) : (
                      <div className="spotPicContainerNoEdit" key={image.id}>
                        <LazyLoad>
                       
                          <div className="spotPictureRenderContainer">
                            <a href="#!">
                              <img
                                src={image.url}
                                className="spotPictureRender"
                                onClick={() => imagePage(image.url)}
                                alt="Delete"
                              />
                            </a>
                          </div>
                          <div className="imgDelete">
                            {image.email === user.email ? (
                              <Link
                                to={
                                  "/spot/" +
                                  spot.id +
                                  "/deleteImage/" +
                                  image.id +
                                  "/"
                                }
                              >
                                <Button color="danger">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                  </svg>
                                </Button>
                              </Link>
                            ) : (
                              <></>
                            )}
                          </div>

                          <div className="imagePosted">
                            Posted By: {image.displayName} on {image.time}
                          </div>
                        </LazyLoad>
                      </div>
                    )}
                  </>
                );
              })
            ) : (
              <></>
            )}
          </Row>
        </div>
      ))}
    </div>
  );
}
