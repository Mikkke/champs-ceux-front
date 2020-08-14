import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "../modal/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const schema = yup.object().shape({
  name: yup
    .string()
    .max(30, "le nom doit comporter 30 caracteres max")
    .required("ce champs est requis")
});
const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Historique = ({ currentUser }) => {
  const currentId = currentUser && `${currentUser.sellerId}`;
  console.log("currentId 4:>> ", currentId);
  const [history, setHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [produitInfos, setProduitInfos] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateDate] = useState([]);
  console.log("history :>> ", history);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });
  useEffect(() => {
    console.log("currentId 3:>> ", currentId);
    axios.get(`http://localhost:8080/api/historique/${currentId}`).then(res => {
      console.log("res.data :>> ", res.data);
      setHistory(res.data);
      console.log("currentId 1 dans le useeffect :>> ", currentId);
    });
    console.log("currentId 2 dans le useeffect :>> ", currentId);
  }, [currentId]);
  console.log("produitInfos pour le modal :>> ", produitInfos);

  const showModal = id => {
    setOpenModal(true);
    console.log("id du modal :>> ", id);
    axios
      .get(`${initialUrl}/${id}`)
      .then(res => {
        console.log("res.data du showmodal :>> ", res.data);
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
        <h2>{produitInfos.name}</h2>
      </div>
      <div className="modalBody">
        <img
          className="image"
          src={
            !produitInfos.photo.includes("firebasestorage.googleapis")
              ? `${apiBaseURL}${produitInfos.photo}`
              : produitInfos.photo
          }
          alt="produit"
        />
        <div className="modelBody--container">
          <p>Prix {produitInfos.price}</p>
          <h3>Quantité {produitInfos.quantity}</h3>
          <h3> Description {produitInfos.description}</h3>
        </div>
        <form>
          <input
            placeholder="Nom"
            name="name"
            type="text"
            defaultValue={produitInfos.name}
          />
          <input
            placeholder="Prix"
            name="price"
            type="number"
            defaultValue={produitInfos.price}
          />
          <input
            placeholder="Quantité"
            name="quantity"
            type="number"
            defaultValue={produitInfos.quantity}
          />
          <input
            placeholder="type"
            name="type"
            type="text"
            defaultValue={produitInfos.type}
          />
          <textarea
            placeholder="descriptioon"
            name="description"
            type="text"
            defaultValue={produitInfos.description}
          />
          <input
            placeholder="photo"
            name="name"
            type="file"
            //value={produitInfos.photo}
            readOnly={produitInfos.photo}
          />
        </form>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>
          Fermer
        </button>
        <button onClick={() => updateProduct(produitInfos.id)}>Modifier</button>
      </div>
    </Fragment>
  ) : (
    <h1>Je charge</h1>
  );

  const deleteProduct = async id => {
    await axios
      .delete(`${initialUrl}/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log("error :>> ", error);
      });
    window.location.reload(false);
  };
  const updateProduct = async (id, data) => {
    try {
      await axios.put(`${initialUrl}/${id}`, data).then(res => {
        console.log(res.data);
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
    window.location.reload(false);
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
        {history.length === 0 ? (
          <p>Vous navez rien mis en ligne encore</p>
        ) : (
          history.map((el, index) => {
            return (
              <div className="history-card" key={index}>
                <div className="card">
                  <img src={el.product.photo} alt="produit" />
                </div>

                <div className="card-body">
                  <p>{el.product.name}</p>
                  <p>ajouter le {el.product.createdAt}</p>
                  <p>prix {el.product.price}</p>
                  <p>quantité {el.product.quantity}</p>
                  <p>description {el.product.description}</p>
                </div>
                <div>
                  <MdDelete
                    size={25}
                    onClick={() => deleteProduct(el.product.id)}
                  />
                  <FaEdit size={25} onClick={() => showModal(el.product.id)} />
                  {console.log("el.product.id >> ", el.product.id)}
                </div>
              </div>
            );
          })
        )}
      </div>
      <Modal showModal={openModal} closeModal={closeModal}>
        {resultInModal}
      </Modal>
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
