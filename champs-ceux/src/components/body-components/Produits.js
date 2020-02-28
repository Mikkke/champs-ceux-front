import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Produits = () => {
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
          console.log(`${apiBaseURL}${el.photo}`);
          return (
            <div key={index} className="my-card">
              <Card>
                <CardImg
                  className="image"
                  top
                  width="100%"
                  src={`${apiBaseURL}${el.photo}`}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>{el.nom}</CardTitle>
                  <CardSubtitle>{el.prix}</CardSubtitle>
                  <CardText>{el.quantite}</CardText>
                  <Button variant="contained" color="primary" size="sm">
                    Ajouter au panier
                  </Button>
                  <Button variant="contained" color="primary" size="sm">
                    Voir produit
                  </Button>
                </CardBody>
              </Card>
            </div>
          ); //<p key={index}>{el.nom}</p>;
        })
      )}
    </div>
  );
};

export default Produits;
