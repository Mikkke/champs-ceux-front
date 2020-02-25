import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-header">
      <Link to="/">ACCEUIL</Link>
      <Link to="/produits">PRODUITS</Link>
      <Link to="/contact">CONTACT</Link>
      <Link to="/compte">COMPTE</Link>
      <Link to="/panier">PANIER</Link>
    </nav>
  );
};

export default Nav;
