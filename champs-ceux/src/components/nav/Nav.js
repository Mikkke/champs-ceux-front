import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-header">
      <Link to="/">Accueil</Link>
      <Link to="/produits">Produits</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/compte">Compte</Link>
      <Link to="/panier">Panier</Link>
    </nav>
  );
};

export default Nav;
