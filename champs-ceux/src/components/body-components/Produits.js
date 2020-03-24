import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { addCard } from "../../actions/addActions";
import Modal from "../modal/Modal";
import Axios from "axios";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Produits = props => {
  console.log("props :", props);
  /*   const { buttonLabel, className } = props; */

  const [produit, setProduit] = useState([]);
  console.log("composant produit", produit);

  const getProduitData = url => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        //const [{ nom, prix, quantite, description, photo }] = data;

        setProduit(data);
        console.log(data, "data");
      })
      .catch(err => console.error("vous avez une erreur", err));
  };

  useEffect(() => {
    getProduitData(initialUrl);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [produitInfos, setProduitInfos] = useState([]);
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
        <h2>Titre</h2>
      </div>
      <div className="modalBody">
        <h3>Titre 2</h3>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>
          Fermer
        </button>
        <button className="modalBtn1" onClick={props.addCard}>
          Ajouter au panier
        </button>
      </div>
    </Fragment>
  ) : (
    <h1>Je charge</h1>
  );
  return (
    <div className="produit-div">
      {produit.length === 0 ? (
        <h1>Chargement...</h1>
      ) : (
        produit.map((el, index) => {
          console.log("coucou mike !!!", `${apiBaseURL}${el.photo}`);
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
                  <h1 className="card-title">{el.nom}</h1>
                  <p className="card-price">{el.prix}€</p>
                  <p className="card-quantity">{el.quantite} KG</p>
                  <button
                    variant="contained"
                    color="primary"
                    size="sm"
                    onClick={props.addCard}
                    className="addPanier"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    color="danger"
                    /* onClick={toggle} */
                    className="see-produit"
                    onClick={() => showModal(el.id)}
                  >
                    voir produit
                  </button>
                </div>
              </div>
            </div>
          ); //<p key={index}>{el.nom}</p>;
        })
      )}
      <Modal showModal={openModal} closeModal={closeModal}>
        {resultInModal}
      </Modal>
    </div>
  );
};

export default connect(null, { addCard })(Produits);
