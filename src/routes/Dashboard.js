import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Container, Row, Col } from 'reactstrap';
import { v4 } from 'uuid';
import { db } from '../firebase-config';
import { onSnapshot, collection } from 'firebase/firestore';
import Loading from '../graphics/Loading';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import Help from '../graphics/Help';
import Help2 from '../graphics/Help2';
import AllowLocation from '../graphics/AllowLocation';
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [spotType, setSpotType] = useState(false);
  const [spotView, setSpotView] = useState(false);
  const [spotUpload, setSpotUpload] = useState(false);
  const [spotLike, setSpotLike] = useState(false);

  return (
    <div>
      <Container>
        <Row>
          <div className="globalTopMargin"></div>
        </Row>
        <Row>
          <Col lg="7">
            <div className="dashboardStyle">
              <div>Welcome {user.displayName}, to Slantyard!</div>{' '}

              <div className="strongUser"> When you first sign in and go to "All Spots" it will center the map on your GPS location. If you do not see any markers on the map you may need to zoom out to see them. Thanks!</div>
              <div>
                <Help />
                Here is an image with some helpful tips on how to nagivate
                around the app.{' '}
              </div>
              <div>
                On the top row there is a series of icons, from left to right
                they are:
                <a href="#!" onClick={() => setSpotType(!spotType)}>
                  <p>Spot Type</p>
                </a>
                {spotType ? (
                  <p>
                    Shows you if this is a public of private spot. Public spots
                    are viewable to everyone, private ones must be shared with
                    you by whoever created the spot.
                  </p>
                ) : (
                  <></>
                )}{' '}
                <a href="#!" onClick={() => setSpotView(!spotView)}>
                  <p>View Spot</p>
                </a>
                {spotView ? (
                  <p>
                    Takes you to the spot, this will show you a map with the
                    spot with a pin on it, as well as some details, pictures,
                    and comments.
                  </p>
                ) : (
                  <></>
                )}
                <a href="#!" onClick={() => setSpotUpload(!spotUpload)}>
                  <p>Upload Image</p>
                </a>
                {spotUpload ? (
                  <p>
                    This will take you to a page that will allow you to upload
                    an image to that spot.
                  </p>
                ) : (
                  <></>
                )}
                <a href="#!" onClick={() => setSpotLike(!spotLike)}>
                  <p>Like Spot</p>
                </a>
                {spotLike ? (
                  <p>
                    This will allow you to like the spot. So you can view it in
                    your liked spots.
                  </p>
                ) : (
                  <></>
                )}
                <br />
                <br />
                <AllowLocation />
                <br />
                <br />
                Please be sure to{' '}
                <i>
                  <b>Allow</b>
                </i>{' '}
                Location when you see this pop up, otherwise the maps will not
                render.
                <br />
                <br />
                <Help2 />
                <div>
                  You can click the <i>Add Spot</i> button to add a new spot. It
                  will start on whereever you are, so be sure to be near the
                  spot you want to add.
                </div>
              </div>
              <div>
                {' '}
                To go view the spots go to the top, and select <i>
                  Spots
                </i> then <i>All Spots</i>, or click{' '}
                <Link to="/spots">here</Link>
              </div>
            </div>
          </Col>

          <Col lg="4">
            <div className="confirmUserStyle">Updates</div>

            <div className="confirmUserStyle updates">
              <p>3/11/2023</p>
              <p>Hello, we've moved to version 0.1.2</p>

              <p>
                I've added some fun background images. I also fixed the add and edit spots to once again allow users to move markers on the map and save the spots, since the geolocation was disabled from google, this also needed fixed.
                If you enable location services, the maps should work in Firefox/Safari, I haven't tried Edge. If you do not enable location services the maps will not work at all, however, you should still be able to add spots, you just can't mark where they are. Hopefully we can fix this in a future version.
              </p>

            </div>
            <div className="confirmUserStyle updates">
              <p>3/10/2023</p>
              <p>Hello, we've moved to version 0.1.1</p>

              <p>
                In this version, changes were made to the adding and editing
                spots functionality. Geocoding was disabled from the app some
                time ago, Adding a Spot and Editing a Spot needed changed to
                accept empty parameters for the values that were previously
                generated by this costly API.
              </p>

              <p>
                {' '}
                In the next update you should expect a feature to pull the
                coordinates from your phone/machine's connection location into
                adding or editing a ticket with a button.
              </p>
            </div>
            <div className="confirmUserStyle">
              Hello welcome to version 0.1 Stay tuned for more updates and
              features. Thanks!
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
