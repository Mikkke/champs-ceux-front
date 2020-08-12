import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

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
              <h3>{el.product.name}</h3>
              <p>ajouter le {el.createdAt}</p>
              <p>prix {el.price}</p>
              <p>quantité {el.quantity}</p>
              <p>description {el.description}</p>
              <p>
                ajouter le <img src={el.photo} alt="produit" />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(Historique);
