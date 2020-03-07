import React from "react";
//import { useForm } from "react-hook-form";
//import * as yup from "yup";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebase, fireAuth } from "../../firebase/Firebase";
import axios from "axios";

const firebaseAppAuth = fireAuth;
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};
/* const schema = yup.object().shape({
  nom: yup
    .string()
    .max(30, "le nom dois compter 30 caracteres maximum")
    .required("ce champs est requis")
});*/

const SignUp = ({ user, signOut, signInWithGoogle }) => {
  async function callApi() {
    await axios.get("http://localhost:8000/api/auth");
  }

  React.useEffect(() => {
    if (user) {
      user
        .getIdToken()
        .then(idToken => {
          console.log("idToken", idToken);
          axios.defaults.headers.common["Authorization"] = idToken;
        })
        .catch(err => console.log(err));
    }
  }, [user]);
  /*const { register, handleSubmit, errors } = useForm({
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
  }; */

  return (
    <div>
      {user ? <p>Salut, {user.displayName}</p> : <p>Login stp</p>}
      {user ? (
        <>
          <button onClick={signOut}>Déconnexion</button>
          <button onClick={() => callApi(user)}>ping Serveur</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Se login avec Google</button>
      )}
    </div>
  );
  /*    <div>
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
  */
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(SignUp);
