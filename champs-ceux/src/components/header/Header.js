import React from "react";
import Logo from "../logo/Logo";
import Nav from "../nav/Nav";
import "./header.css";
/* import { GiHamburgerMenu } from "react-icons/gi"; */
const Header = () => {
  return (
    <header className="header">
      {/* <GiHamburgerMenu className="menu" size={40} /> */}
      <Logo />
      <p>ChampsCeux</p>
      <Nav />
    </header>
  );
};

export default Header;
