import React from "react";
import { Link } from "react-router-dom";

const IndexCompte = () => {
  return (
    <div className="compte-div">
      <Link to="/inscription">Inscription</Link>
      <Link to="/connexion">Connexion</Link>
    </div>
  );
};

export default IndexCompte;
