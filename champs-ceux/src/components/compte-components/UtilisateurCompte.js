import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Utilisateur = ({ currentUser }) => {
  const isAuth = localStorage.getItem("auth");
  console.log("currentUser :>> du utilisateur ", currentUser);
  //console.log("isAuth de produit :>> ", isAuth);
  const currentDescription = currentUser ? (
    <div>
      <h3> Nom: {currentUser.name}</h3>
      <h3> Mail: {currentUser.email}</h3>
      <h3> Ville: {currentUser.city}</h3>
      <h3> Code postal: {currentUser.postalCode}</h3>
      <h3> Telephone: {currentUser.phoneNumber}</h3>
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
