import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const NavCompte = props => {
  console.log("props de navcompte :>> ", props);
  //console.log("props  nav co:>> ", props);

  const isAuth = localStorage.getItem("auth");
  console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/inscription" />;
  }

  return (
    <div className="navCompte">
      <aside>
        <nav>
          <Link to="/produitscompte">Produits</Link>
          <Link to="/moncompte">Compte</Link>
          <Link to="historique">Historique</Link>
        </nav>
      </aside>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(NavCompte);
