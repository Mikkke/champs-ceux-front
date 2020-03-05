import React, { useState } from "react";
import { connect } from "react-redux";
import { addCard } from "../../actions/addActions";

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
                  >
                    voir produit
                  </button>
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
