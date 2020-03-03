import React, { useState } from "react";
import {
  Button /* , Modal, ModalHeader, ModalBody, ModalFooter  */
} from "reactstrap";
import { connect } from "react-redux";
import { addCard } from "../../actions/addActions";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Produits = props => {
  console.log("props :", props);
  /*   const { buttonLabel, className } = props; */

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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

  React.useEffect(() => {
    getProduitData(initialUrl);
  }, []);

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
                  <div className="card-title"> produit : {el.nom}</div>
                  <div className="card-price"> prix : {el.prix}€</div>
                  <div className="card-quantity">
                    quantité : {el.quantite} kilo
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="sm"
                    onClick={props.addCard}
                    className="addPanier"
                  >
                    Ajouter au panier
                  </Button>
                  <Button
                    color="danger"
                    onClick={toggle}
                    className="see-produit"
                  >
                    voir produit
                  </Button>
                </div>
              </div>
            </div>
          ); //<p key={index}>{el.nom}</p>;
        })
      )}
    </div>
  );
};

export default connect(null, { addCard })(Produits);
