import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Historique = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {}, []);

  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }
  return (
    <div className="compte-historique">
      <h3>Retrouver vos produit ici</h3>
    </div>
  );
};

export default Historique;
