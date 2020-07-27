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
  nom: yup
    .string()
    .max(30, "le nom doit comporter 30 caracteres max")
    .required("ce champs est requis")
});

const ProduitsCompte = props => {
  console.log("props du produit compte :>> ", props);
  const currentId = props.currentUser ? (
    <div>Bonjour {props.currentUser.sellerId}</div>
  ) : null;

  console.log("currentUser du produit compte :>> ");

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const onSubmit = async data => {
    console.log(data.photo[0], "data");
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
          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
        // return url;
      }
    );
  };
  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }

  return (
    <div className="compte-div">
      <h1>Ajouter produit</h1>
      {currentId}
      <div className="compte-produit-div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nom </label> <input ref={register} name="nom" type="text" />
          {errors.nom && errors.nom.message}
          <label>Prix </label>
          <input ref={register} name="prix" type="number" />
          <label>Quantité </label>
          <input ref={register} name="quantite" type="number" />
          <label>Photo </label>
          <input ref={register} name="photo" type="file" />
          <label>Description </label>
          <textarea ref={register} name="description" />
          <button type="submit" value="ajouter a la liste">
            Ajouter a la liste de produit
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
