import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fireAuth } from "../../firebase/Firebase";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = e => {
    e.preventDefault();

    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => console.log("user :", user))
      .catch(err => console.log("err :", err));
  };

  return (
    <div className="connexion-div">
      <h2>Connexion</h2>
      <form>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleSignIn}>Connexion</button>
      </form>
      <p>
        Pas encore de compte ? <Link to="/inscription">inscrivez-vous</Link>{" "}
      </p>
    </div>
  );
};

export default Connexion;
