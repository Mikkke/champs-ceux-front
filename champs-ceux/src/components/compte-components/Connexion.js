import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fireAuth } from "../../firebase/Firebase";

const Connexion = props => {
  console.log("props connexion :", props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = e => {
    e.preventDefault();

    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log("user de connection:", user);
        props.history.push("/navCompte");
      })
      .catch(err => console.log("err :", err));
  };

  return (
    <div className="connexion-div">
      <div className="wrap">
        <h2>Connexion</h2>
        <form>
          <input
            type="email"
            placeholder="Email.."
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            value={password}
            placeholder="Mot de passe.."
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button onClick={handleSignIn}>Connexion</button>
        </form>
        <p>
          Pas encore de compte ? <Link to="/inscription">inscrivez-vous</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Connexion;
