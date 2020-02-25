import React from "react";
import Logo from "../logo/Logo";
import Nav from "../nav/Nav";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <Nav />
    </div>
  );
};

export default Header;
