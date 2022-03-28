import React, { useState } from "react";
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

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="top" full>
        <NavbarBrand href="/">SkateSpot</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
            <Button
    color="primary"
  >
    Add Spot
  </Button>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Spots</NavLink>
            </NavItem>
            
          </Nav>
          <Nav navbar>
           
            <NavItem>
              <NavLink href="/">Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
