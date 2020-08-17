import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "../modal/Modal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Historique = ({ currentUser }) => {
  const currentId = currentUser && `${currentUser.sellerId}`;
  const [history, setHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [produitInfos, setProduitInfos] = useState({});
  const [loading, setLoading] = useState(true);

  ///updated data send

  const [nameProduct, setNameProduct] = useState("sans le bail");
  /*const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(); */

  let data = {
    name: nameProduct,
    price: "",
    quantity: "",
    description: "",
    /*       photo: "", */
    type: ""
  };

  const [updateData, setUpdateData] = useState(data);
  console.log("updateData :>> ", updateData);
  const handleChange = e => {
    setUpdateData({ ...updateData, [e.target.id]: e.target.value });
  };

  const { name, price, quantity, description, /* photo, */ type } = updateData;
  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log("currentId 3:>> ", currentId);
    axios.get(`http://localhost:8080/api/historique/${currentId}`).then(res => {
      console.log("res.data :>> ", res.data);
      setHistory(res.data);
      console.log("currentId 1 dans le useeffect :>> ", currentId);
    });
    console.log("currentId 2 dans le useeffect :>> ", currentId);
  }, [currentId]);

  const showModal = id => {
    setOpenModal(true);
    console.log("id du modal :>> ", id);
    axios
      .get(`${initialUrl}/${id}`)
      .then(res => {
        console.log("res.data id du showmodal :>> ", res.data.id);
        setProduitInfos(res.data);
        setLoading(false);
        setNameProduct(res.data.name);
        console.log("res.data.name du show modal:>> ", res.data.name);
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
        <div className="modal-body--container">
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
            <p>{produitInfos.price}€</p>
            <p>{produitInfos.quantity}</p>
            <p>{produitInfos.description}</p>
            {/* <p>{produitInfos.createdAt}</p> */}
          </div>
        </div>

        <form className="form-history--product" onSubmit={handleSubmit}>
          <input
            placeholder="Nom"
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <input
            placeholder="Prix"
            name="price"
            id="price"
            type="number"
            onChange={handleChange}
            value={price}
          />
          <input
            placeholder="Quantité"
            name="quantity"
            id="quantity"
            type="number"
            onChange={handleChange}
            value={quantity}
          />
          <input
            placeholder="type"
            name="type"
            id="type"
            type="text"
            onChange={handleChange}
            value={type}
          />
          <textarea
            placeholder="descriptioon"
            name="description"
            id="description"
            type="text"
            onChange={handleChange}
            value={description}
          />
          {/* <input
            placeholder="photo"
            id="photo"
            name="name"
            type="file"
            onChange={handleChange}
            value={photo}
          /> */}
        </form>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>
          Fermer
        </button>
        <button onClick={() => updateProduct(produitInfos.id, updateData)}>
          Valider
        </button>
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
      const res = await axios.put(`${initialUrl}/${id}`, data);
      console.log("res :>> ", res);
      console.log("res.data update product :>> ", res.data);
    } catch (error) {
      console.log("error :>> ", error);
    }
    //window.location.reload(false);
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
                <div className="history-button--container">
                  <MdDelete
                    className="bin"
                    size={25}
                    onClick={() => deleteProduct(el.product.id)}
                  />
                  <FaEdit
                    className="edit"
                    size={25}
                    onClick={() => showModal(el.product.id)}
                  />
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
