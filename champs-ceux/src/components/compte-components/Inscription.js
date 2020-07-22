import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "ce champs ne doit pas depasser 10 caracteres")
    .required("ce champs est requis"),
  email: yup
    .string()
    .email()
    .max(30, "ne doit pas depasser 30 caracteres")
    .required("ce champs est requis"),
  /*   address: yup
    .string()
    .min(10)
    .required("ce champs est requis"), */
  password: yup
    .string()
    .min(6, "doit contenir plus de 6 caracter")
    .required("ce champs est requis")
});

const Inscription = ({ history }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const [password] = useState("");
  const [confirmPassword] = useState("");
  const [profilType, setProfilType] = useState("");
  const [adress, setAdress] = useState("");

  const onSubmit = async data => {
    console.log("data :>> ", data);
    if (password === confirmPassword) {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/profil/register",
          data
        );
        console.log("res.data :>> ", res.data);
        console.log("res.data.response :>> ", res.data.response);
        history.push("/navCompte");
      } catch (error) {
        console.log("error :>> ", error);
      }
    } else {
      alert("les mot de passe ne correspondent pas");
    }
  };

  const addressInput =
    profilType === "seller" ? (
      <div>
        <input
          type="text"
          id="password"
          required
          value={adress}
          onChange={e => setAdress(e.target.value)}
          placeholder="Adresse.."
          name="adress"
          ref={register}
        />
        {errors.adress && errors.adress.message}
      </div>
    ) : null;

  return (
    <div className="inscription-div">
      <div className="wrap-inscription">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="pseudo"
            placeholder="Nom..."
            required
            name="name"
            ref={register}
          />
          {errors.name && errors.name.message}

          <input
            type="email"
            id="email"
            placeholder="Email.."
            required
            name="email"
            ref={register}
          />
          {errors.email && errors.email.message}

          <div className="inputBox">
            <label>Je suis</label>
            <select
              name="profilType"
              form="carform"
              className="select"
              onChange={e => setProfilType(e.target.value)}
              ref={register}
            >
              <option value="buyer">Acheteur</option>
              <option value="seller">Agriculteur</option>
            </select>
          </div>
          {addressInput}

          <input
            type="password"
            id="password"
            name="password"
            ref={register}
            placeholder="Mot de passe.."
          />
          {errors.password && errors.password.message}

          <input
            type="password"
            id="confirmPassword"
            placeholder="confirmer mot de passe.."
          />
          <button type="submit">Inscrivez-vous</button>
        </form>
        <p>
          Deja un compte ? <Link to="/compte">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Inscription;
