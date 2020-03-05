import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  nom: yup
    .string()
    .max(30, "le nom dois compter 30 caracteres maximum")
    .required("ce champs est requis")
});

const SignUp = () => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const onSubmit = async data => {
    console.log(data);

    try {
      const res = await axios.post("http://localhost:8080/api/users", data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="sign-div-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nom</label>
          <input ref={register} name="nom" type="text" />
          {errors.nom && errors.nom.message}
          <label>Prenom</label>
          <input ref={register} name="prenom" type="text" />
          <label>Mot de passe</label>
          <input ref={register} name="password" type="text" />
          <label>Telephone</label>
          <input ref={register} name="telephone" type="tel" />
          <label>Email</label>
          <input ref={register} name="email" type="email" />
          <label>Adresse</label>
          <input ref={register} name="adresse" type="text" />
          <input type="submit" value="inscription" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
