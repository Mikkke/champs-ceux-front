import React from "react";
import { Link } from "react-router-dom";

const NavCompte = () => {
  return (
    <nav>
      <Link to="/">Mes produits</Link>
      <Link to="/">Mon compte</Link>
      <Link to="/">Contact</Link>
    </nav>
  );
};

export default NavCompte;
