import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/authAction";

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

// eslint-disable-next-line react/prop-types
const Connexion = props => {
  console.log("props de connexion sur le bitin :>> ", props);
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
      const auth = res.data.isAuthenticated;
      localStorage.setItem("auth", JSON.stringify(res.data));
      // eslint-disable-next-line react/prop-types
      props.setCurrentUser(res.data);
      props.history.push("/navCompte");
      //localStorage.setItem("user", JSON.stringify(res.data));
      // eslint-disable-next-line react/prop-types
    } catch (error) {
      console.log("error.message :>> ", error.response);
    }
  };

  /* const friends = ["jhon", "peter", "fred"];
  localStorage.setItem("friends", JSON.stringify(friends));
  const values = JSON.parse(localStorage.getItem("friends"));
  console.log("values[1] :>> ", values[1]); */

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

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Connexion);
