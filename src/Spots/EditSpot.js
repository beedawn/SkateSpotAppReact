import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import "../styles/style.css";
import SpotPics from "./SpotComponents/SpotPics";
import { refreshPage } from "../functions/Refresh";
import Loading from "../graphics/Loading";
import Maps from "../maps/Maps";
import Select from 'react-select';

export default function EditSpot() {
  const { spot } = useParams();
  const [userArray, setUserArray] = useState([]);
  const [spotLocation, setSpotLocation] = useState("");
  const [spotName, setSpotName] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [spots, setSpots] = useState([]);
  const [gps, setGps] = useState();
  const [sharedUsers,setSharedUsers]= useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUserArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const filteredSpots = spots.filter(function (el) {
    return el.id === spot;
  });

  const handleEdit = async (id) => {
    if (gps) {
      const docRef = doc(db, "spots", id);
      const date = new Date(Date.now());
      const payload = {
        ...filteredSpots[0],
        name: spotName,
        location: spotLocation,
        description: spotDescription,
        time: date.toString(),
        edited: true,
        lat: gps.lat,
        long: gps.long,
        users:sharedUsers
      };
      await setDoc(docRef, payload);
      refreshPage();
    } else {
      const docRef = doc(db, "spots", id);
      const date = new Date(Date.now());
      const payload = {
        ...filteredSpots[0],
        name: spotName,
        location: spotLocation,
        description: spotDescription,
        time: date.toString(),
        edited: true,
        users:sharedUsers
      };
      await setDoc(docRef, payload);
      refreshPage();
    }
  };

  //Handle Drag is Passed to Maps Component
  function handleDrag(e) {
    setGps({ lat: e.latLng.lat(), long: e.latLng.lng() });
  }

  if (filteredSpots.length === 0) {
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  } else {
    const filteredUserArray = userArray.map((user)=>{return({value:user.id, email: user.email, name:user.name, label:`${user.name} -  ${user.email}`})});
  
    return (
      <div>
        <h2>Edit a Spot</h2>
        {gps ? (
          <Maps
            spot={[{edit:true, lat: gps.lat, long: gps.long, id: filteredSpots[0].id }]}
            spots={spots}
            handleDrag={handleDrag}
            drag={true}
            singleView={true}
          />
        ) : (
          <Maps
            spot={[
              {
                edit:true,
                lat: filteredSpots[0].lat,
                long: filteredSpots[0].long,
                id: filteredSpots[0].id,
              },
            ]}
            spots={spots}
            handleDrag={handleDrag}
            drag={true}
            singleView={true}
          />
        )}

        <SpotPics />
        {filteredSpots.map((spot) => (
          <div className="globalTopMargin">
            <Input
              defaultValue={spot.name}
              onChange={(event) => setSpotName(event.target.value)}
            />
          </div>
        ))}
           {spotName ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please update Spotname</span>
        )}

        {filteredSpots.map((spot) => (
          <div style={{ marginTop: "1rem" }}>
            <Input
              editable="true"
              defaultValue={spot.description}
              type="textarea"
              onChange={(event) => setSpotDescription(event.target.value)}
            />
              {spotDescription ? (
          <p></p>
        ) : (
          <span className="errorSpan">Please update Description</span>
        )}

<div><Select isMulti options={filteredUserArray} onChange={(e)=>(setSharedUsers(e))} defaultValue={[...spot.users]}/></div>
</div>
        ))}

        <div style={{ marginTop: "1rem" }}>
          <div>
          {spotName && spotDescription ? (
              <Button color="primary" onClick={() => handleEdit(spot)}>
                Submit
              </Button>
            ) : (
              <p>
                Once you complete the required forms a submit button will appear
                here
              </p>
            )}
          </div>
          <div>
            <Button
              color="primary"
              onClick={() => {
                refreshPage();
              }}
            >
              {" "}
              Cancel{" "}
            </Button>
            <Link to={"/spot/" + spot + "/delete"}>
              <Button
                color="danger"
                className="adminButtonsEach"
                onClick={() => {}}
              >
                Delete
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
