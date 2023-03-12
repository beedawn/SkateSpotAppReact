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
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand href="/spots">Slantyard</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/addspot">
                <Button color="primary">Add Spot</Button>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Spots
              </DropdownToggle>
              <DropdownMenu style={{ backgroundColor: "#292b2c" }}>
                <DropdownItem>
                  <NavLink href="/spots">All Spots</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/spots/my">My Spots</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/spots/liked">Liked Spots</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/spots/shared">Spots Shared with Me</NavLink>
                </DropdownItem>
                
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/account">Account</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/">Help</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <Button color="primary" onClick={logout}>
                Log Out{" "}
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
