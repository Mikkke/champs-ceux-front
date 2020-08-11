import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Utilisateur = ({ currentUser }) => {
  const isAuth = localStorage.getItem("auth");
  console.log("currentUser :>> du utilisateur ", currentUser);
  //console.log("isAuth de produit :>> ", isAuth);
  const currentDescription = currentUser ? (
    <div>
      <h1> Nom: {currentUser.name}</h1>
      <h1> Mail: {currentUser.email}</h1>
      <h1> Ville: {currentUser.city}</h1>
      <h1> Code postal: {currentUser.postalCode}</h1>
      <form>
        <input type="submit" value="supprimez compte" />
      </form>
    </div>
  ) : null;
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }
  return <div className="utilisateur-div">{currentDescription}</div>;
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(Utilisateur);
