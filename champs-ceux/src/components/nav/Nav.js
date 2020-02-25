import React from "react";
import Acceuil from "./navigation/Acceuil";
import Produits from "./navigation/Produits";
import Contact from "./navigation/Contact";
import Recherche from "./navigation/Recherche";
import Compte from "./navigation/Compte";
import Panier from "./navigation/Panier";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav-header">
      <Acceuil />
      <Produits />
      <Contact />
      <Recherche />
      <Compte />
      <Panier />
    </div>
  );
};

export default Nav;
