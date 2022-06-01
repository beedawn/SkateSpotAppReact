import React, { useState, useContext, useEffect } from "react";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import "../styles/style.css";
export default function UserPage() {
  const { user } = useParams();
  const [userArray, setUserArray] = useState([]);
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  });

  const filteredUser = userArray.filter(function (el) {
    return el.id === user;
  });

  if (filteredUser[0] !== undefined) {
    return (
      <div className="userPageContainer">
        <div className="userPage">
          <p>{filteredUser[0].name}</p>
          <p>Photo: </p>
          {filteredUser[0].images[filteredUser[0].images.length - 1] ? (
            <div>
              <a
                href={
                  filteredUser[0].images[filteredUser[0].images.length - 1].url
                }
              >
                <img
                  className="userPicture"
                  src={
                    filteredUser[0].images[filteredUser[0].images.length - 1]
                      .url
                  }
                  alt="Avatar"
                />
              </a>{" "}
            </div>
          ) : (
            <>
              <FaUserCircle />
            </>
          )}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
