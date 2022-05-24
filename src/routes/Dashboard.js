import React, { useContext,useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Container,Row, Col } from "reactstrap";
import { v4 } from "uuid";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
import Loading from "../graphics/Loading";

export default function Dashboard() {
const { user } = useContext(AuthContext);
const [spots, setSpots] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsub;
  }, []);
if (spots.length !== 0) {
  return (
  <Container>
    <Row>
        <div>Logo</div></Row>
        <Row><Col lg="4">
        <div>Welcome {user.displayName}</div></Col>
        <Col lg="4"><div>New spots</div></Col><Col lg="4"><div>Updates</div></Col>
    </Row></Container>)
    } else {
      return (
        <div style={{ padding: "1rem 0" }}>
          <Loading />
        </div>
      );
    }
}
