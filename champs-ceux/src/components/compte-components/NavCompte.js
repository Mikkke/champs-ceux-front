import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NavCompte = props => {
  console.log("props  nav co:>> ", props);
  return (
    <div className="navCompte">
      <aside>
        <nav>
          <Link to="/produitscompte">Produits</Link>
          <Link to="/moncompte">Compte</Link>
          <Link to="historique">Historique</Link>
        </nav>
      </aside>
      <div className="main-navCompte"></div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(NavCompte);
