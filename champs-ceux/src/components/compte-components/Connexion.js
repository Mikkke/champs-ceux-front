import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .max(30, "ne doit pas depasser 30 caracteres")
    .required("ce champs est requis"),
  password: yup
    .string()
    .min(6, "doit contenir plus de 6 caracterers")
    .required("ce champs est requis")
});

const Connexion = ({ history }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const onSubmit = async data => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/profil/login",
        data
      );
      console.log("res :>> ", res);
      console.log("res.data :>> ", res.data);
      history.push("/navCompte");
    } catch (error) {
      console.log("error.message :>> ", error.response.data.message);
    }
  };

  return (
    <div className="connexion-div">
      <div className="wrap">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email.."
            name="email"
            ref={register}
          />
          {errors.email && errors.email.message}

          <input
            name="password"
            type="password"
            placeholder="Mot de passe.."
            ref={register}
          />
          {errors.password && errors.password.message}
          <button type="submit">Connexion</button>
        </form>
        <p>
          Pas encore de compte ? <Link to="/inscription">inscrivez-vous</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Connexion;
