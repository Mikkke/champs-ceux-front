import React from "react";
import { Redirect } from "react-router-dom";

const Utilisateur = () => {
  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }
  return (
    <div>
      <h1>suR UTILISATEUR</h1>
      <h1>suR UTILISATEUR</h1>
      <h1>suR UTILISATEUR</h1>
      <h1>suR UTILISATEUR</h1>
      <h1>suR UTILISATEUR</h1>
      <h1>suR UTILISATEUR</h1>
      <h1>suR UTILISATEUR</h1>
      <h1>suR UTILISATEUR</h1>
      <h1>suR UTILISATEUR</h1>
    </div>
  );
};

export default Utilisateur;
