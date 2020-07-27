import React from "react";
import { Redirect } from "react-router-dom";

const Historique = () => {
  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }
  return (
    <div>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
      <p>Sur le lhistorique</p>
    </div>
  );
};

export default Historique;
