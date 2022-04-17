import React, { useState, useContext } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavbarText,
} from "reactstrap";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import AuthContext from "../context/AuthContext";





export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);

onAuthStateChanged(auth, (currentUser) => {
   setUser(currentUser);
});

const logout = async () => {
await signOut(auth);
};

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="top" full>
        <NavbarBrand href="/">SkateSpot</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem><NavLink href="/addspot">
            <Button
    color="primary"
  >
    Add Spot
  </Button>
  </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/spots">Spots</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/account">Account</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
           
           
            <NavItem>
            <Button color="primary" onClick={logout} >Log Out </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
