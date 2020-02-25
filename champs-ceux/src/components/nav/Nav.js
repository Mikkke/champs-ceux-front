import React from "react";
import "./Nav.css";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-header">
      <Link to="/">Accueil</Link>
      <Link to="/Produits">Produits</Link>
      <Link to="/Contact">Contact</Link>
      <Link to="/Compte">Compte</Link>
      <Link to="/Panier">Panier</Link>
    </nav>
  );
};

export default Nav;
