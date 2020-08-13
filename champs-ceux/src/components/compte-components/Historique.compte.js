import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Historique = props => {
  console.log("props historique :>> ", props);
  const currentId = props.currentUser ? `${props.currentUser.sellerId}` : null;
  console.log("currentId :>> ", currentId);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/historique/${currentId}`).then(res => {
      console.log("res.data :>> ", res.data);
      setHistory(res.data);
    });
  }, [currentId]);
  const deleteProduct = id => {
    axios
      .delete(`${initialUrl}/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log("error :>> ", error);
      });
  };
  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }
  return (
    <div className="compte-historique">
      <h3>Retrouver vos produit ici</h3>
      <div className="compte-historique--container">
        {history.map((el, index) => {
          return (
            <div className="history-card" key={index}>
              <div className="card">
                <img src={el.product.photo} alt="produit" />
              </div>

              <div className="card-body">
                <p>{el.product.name}</p>
                <p>ajouter le {el.product.createdAt.toString()}</p>
                <p>prix {el.product.price}</p>
                <p>quantité {el.product.quantity}</p>
                <p>description {el.product.description}</p>
              </div>
              <div>
                <button onClick={deleteProduct}>Supprimer</button>{" "}
                <button>modifier</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    produitData: state.produit
  };
};

export default connect(mapStateToProps)(Historique);
