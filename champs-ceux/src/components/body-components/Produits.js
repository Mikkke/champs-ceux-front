import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { fetchProduit } from "../../actions/fetchProduitAction";
/* import { addCard } from "../../actions/addActions"; */
import { addToCart } from "../../actions/cartAction2";
import Axios from "axios";
import Modal from "../modal/Modal";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Produits = props => {
  console.log("props de produit :", props);

  const { fetchProduit, produitData, /* addCard, */ addToCart } = props;

  useEffect(() => {
    fetchProduit();
  }, [fetchProduit]);

  const handleClick = id => {
    addToCart(id);
  };

  const [openModal, setOpenModal] = useState(false);
  const [produitInfos, setProduitInfos] = useState({});
  const [loading, setLoading] = useState(true);

  const showModal = id => {
    setOpenModal(true);
    Axios.get(`${initialUrl}/${id}`)
      .then(res => {
        setProduitInfos(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };
  const closeModal = () => {
    setOpenModal(false);
    setLoading(true);
  };
  const resultInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{produitInfos.nom}</h2>
      </div>
      <div className="modalBody">
        <img
          className="image"
          width="100%"
          src={
            !produitInfos.photo.includes("firebasestorage.googleapis")
              ? `${apiBaseURL}${produitInfos.photo}`
              : produitInfos.photo
          }
          alt="produit"
        />
        <h3>{produitInfos.description}</h3>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>
          Fermer
        </button>
        <button
          className="modalBtn1"
          onClick={() => handleClick(produitInfos.id)}
        >
          Ajouter au panier
        </button>
      </div>
    </Fragment>
  ) : (
    <h1>Je charge</h1>
  );

  //code pour le redirect

  return (
    <div className="produit-div">
      {produitData.loading ? (
        <div>Loading...</div>
      ) : produitData.error ? (
        <div>Une erreur {produitData.error} </div>
      ) : (
        produitData &&
        produitData.produits.map((el, index) => {
          /* console.log("coucou mike !!!", `${apiBaseURL}${el.photo}`);
          console.log("coucou mike !!!", `${apiBaseURL}${el.photo}`); */
          const imgSrc = !el.photo.includes("firebasestorage.googleapis")
            ? `${apiBaseURL}${el.photo}`
            : el.photo;
          return (
            <div key={index} className="my-card">
              <div className="card">
                <img
                  className="image"
                  width="100%"
                  src={imgSrc}
                  alt="produit"
                />
                <div className="card-body">
                  <h1 className="card-title">Produit: {el.nom}</h1>
                  <p>Prix: {el.prix}€</p>
                  <p>Quantite: {el.quantite} KG</p>
                  <button
                    variant="contained"
                    color="primary"
                    size="sm"
                    onClick={() => handleClick(el.id)}
                    className="addPanier"
                  >
                    Ajouter au panier
                  </button>
                  <button onClick={() => showModal(el.id)}>voir produit</button>
                </div>
              </div>
            </div>
          );
        })
      )}
      <Modal showModal={openModal} closeModal={closeModal}>
        {resultInModal}
      </Modal>
    </div>
  );

  /*  return (
    <div className="panier">
      <h1>Sur le Panier</h1>
    </div>
  ); */
};

const mapStateToProps = state => {
  return {
    produitData: state.produit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduit: () => dispatch(fetchProduit()),
    /* addCard: () => dispatch(addCard()), */
    addToCart: id => dispatch(addToCart(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Produits);
