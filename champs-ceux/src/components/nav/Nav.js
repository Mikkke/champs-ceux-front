import React, { useEffect } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getNumbers } from "../../actions/getActions";

const Nav = props => {
  useEffect(() => {
    getNumbers();
  });
  return (
    <nav className="nav-header">
      <Link to="/">ACCUEIL</Link>
      <Link to="/produits">PRODUITS</Link>
      <Link to="/contact">CONTACT</Link>
      <Link to="/compte">COMPTE</Link>
      <Link to="/panier">
        PANIER<span> {props.cardProps.cardNumbers}</span>
      </Link>
    </nav>
  );
};

const mapStateToProps = state => ({
  cardProps: state.cardState
});
export default connect(mapStateToProps, { getNumbers })(Nav);
