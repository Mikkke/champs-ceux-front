/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

import * as firebase from "firebase";
//import firestore from "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDfLbIGAUVxk9dmuf_4KsfV-QzLGz_gGHA",
  authDomain: "champsceux-bee8f.firebaseapp.com",
  databaseURL: "https://champsceux-bee8f.firebaseio.com",
  projectId: "champsceux-bee8f",
  storageBucket: "champsceux-bee8f.appspot.com",
  messagingSenderId: "723927083207",
  appId: "1:723927083207:web:0d64cd7f3fde241080f6e2",
  measurementId: "G-8RQM06HX4D"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const schema = yup.object().shape({
  nom: yup
    .string()
    .max(30, "le nom doit comporter 30 caracteres max")
    .required("ce champs est requis")
});

const Compte = () => {
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

  return (
    <div>
      <h1>Mon Compte</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nom : </label> <input ref={register} name="nom" type="text" />
          {errors.nom && errors.nom.message}
          <label>Prix : </label>{" "}
          <input ref={register} name="prix" type="number" />
          <label>Quantité : </label>{" "}
          <input ref={register} name="quantite" type="number" />
          <label>Photo : </label>{" "}
          <input ref={register} name="photo" type="file" />
          <label>Description : </label>{" "}
          <textarea ref={register} name="description" />
          <input type="submit" value="ajouter a la liste" />
        </form>
      </div>
    </div>
  );
};

export default Compte;
