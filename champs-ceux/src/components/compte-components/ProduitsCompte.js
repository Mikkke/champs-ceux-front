/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { firebase, refStorage } from "../../firebase/Firebase";
import NavCompte from "../compte-components/NavCompte";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const schema = yup.object().shape({
  name: yup
    .string()
    .max(30, "le nom doit comporter 30 caracteres max")
    .required("ce champs est requis")
});

const ProduitsCompte = props => {
  console.log("props du produit compte :>> ", props);
  const currentId = props.currentUser ? `${props.currentUser.sellerId}` : null;

  console.log("currentUser du produit compte :>> ");

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });
  const onSubmit = async data => {
    console.log("data ouoi", data.photo[0], "data");
    const refStorage = firebase.storage().ref("image" + data.photo[0].name);
    let upload = refStorage.put(data.photo[0]);

    upload.on(
      "state_changed",
      snapshot => {},
      error => {},
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL();
        data.photo = url;
        try {
          const res = await axios.post(
            "http://localhost:8080/api/produits",
            data
          );
          console.log("res :>> ", res);
          console.log("data ici bas", res.data);
        } catch (error) {
          console.error(error);
        }
        // return url;
      }
    );
  };

  console.log("currentId :>> ", currentId);
  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }

  return (
    <div className="compte-div">
      <h1>Ajouter produit</h1>
      {/* {currentId} */}
      <div className="compte-produit-div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input ref={register} name="name" type="text" placeholder="Nom" />
          {errors.nom && errors.nom.message}
          <input ref={register} name="price" type="number" placeholder="prix" />
          <input
            ref={register}
            name="quantity"
            type="number"
            placeholder="quantité"
          />
          <label>type </label>
          <select name="type" form="carform" className="select" ref={register}>
            <option>Fruit</option>
            <option>legume</option>
            <option>produit laitier</option>
            <option>viande</option>
          </select>
          <label>Photo</label>
          <input ref={register} name="photo" type="file" placeholder="photo" />
          <textarea
            ref={register}
            name="description"
            placeholder="description"
          />
          {/* <label>userId </label>
          <input
            ref={register}
            name="sellerId"
            type="text"
            defaultValue={currentId}
          /> */}
          <button type="submit" value="ajouter a la liste">
            Ajouter produit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(ProduitsCompte);
