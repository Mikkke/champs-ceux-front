import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Accueil = props => {
  const currentName = props.currentUser ? (
    <div>Bonjour {props.currentUser.name}</div>
  ) : null;
  return (
    <div className="accueil">
      <div className="text-div">
        {currentName}
        <h2>Des bons produits fermier a petit prix</h2>
        <div className="btn">
          <Link to="/produits">Voir nos produits</Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(Accueil);
