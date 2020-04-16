import React from "react";
import { Link } from "react-router-dom";

const NavCompte = () => {
  return (
    <nav className="navCompte">
      <Link to="/produitcomp">Mes produits</Link>
      <Link to="/compte">Mon compte</Link>
      <Link to="historique">Historique</Link>
    </nav>
  );
};

export default NavCompte;
