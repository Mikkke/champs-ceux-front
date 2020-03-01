import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { addCard } from "../../actions/addActions";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Produits = props => {
  console.log("props :", props);
  const { buttonLabel, className } = props;

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
                  <CardTitle> produit : {el.nom}</CardTitle>
                  <CardSubtitle> prix : {el.prix}€</CardSubtitle>
                  <CardText>quantité : {el.quantite} kilo</CardText>
                  <Button
                    variant="contained"
                    color="primary"
                    size="sm"
                    onClick={props.addCard}
                  >
                    Ajouter au panier
                  </Button>
                  <Button color="danger" onClick={toggle}>
                    {buttonLabel} voir produit
                  </Button>
                  <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader key={index} toggle={toggle}>
                      {el.nom}
                    </ModalHeader>
                    <ModalBody key={index}>{el.description}</ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={toggle}>
                        Ajouter au panier
                      </Button>{" "}
                      <Button color="secondary" onClick={toggle}>
                        Quitter
                      </Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </div>
          ); //<p key={index}>{el.nom}</p>;
        })
      )}
    </div>
  );
};

export default connect(null, { addCard })(Produits);
