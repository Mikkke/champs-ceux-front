import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduit } from "../../actions/fetchProduitAction";
const Panier = props => {
  console.log("props du panier produit :", props);

  const { fetchProduit, produit } = props;

  useEffect(() => {
    fetchProduit();
  }, [fetchProduit]);

  return (
    <div className="panier">
      <h1>Sur le Panier</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    produit: state.produit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduit: () => dispatch(fetchProduit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panier);
