import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { addCard } from "../../actions/addActions";
import Modal from "../modal/Modal";
import Axios from "axios";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Produits = ({ addCard }) => {
  console.log("props produit:");
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
  const [produitInfos, setProduitInfos] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("produitInfos :", produitInfos);

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
        <h3>{produitInfos.description}</h3>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>
          Fermer
        </button>
        <button className="modalBtn1" onClick={addCard}>
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
                  <p>{el.prix}€</p>
                  <p>{el.quantite} KG</p>
                  <button
                    variant="contained"
                    color="primary"
                    size="sm"
                    onClick={addCard}
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
};

export default connect(null, { addCard })(Produits);
