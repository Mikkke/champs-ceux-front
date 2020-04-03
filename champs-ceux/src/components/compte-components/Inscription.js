import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fireAuth } from "../../firebase/Firebase";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignUp = e => {
    e.preventDefault();

    if (password === confirmPassword) {
      fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then(user => console.log("user :", user))
        .catch(err => console.log("err :", err));
    } else {
      alert("les mot de passe ne correspondent pas");
    }
  };

  return (
    <div className="inscription-div">
      <h2>Inscription</h2>
      <form>
        {/* <div className="inputBox">
          <input type="text" id="pseudo" autoComplete="off" required />
          <label htmlFor="pseudo">Pseudo</label>
        </div> */}
        <div className="inputBox">
          <input
            type="email"
            id="email"
            autoComplete="off"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            id="password"
            autoComplete="off"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            id="confirmPassword"
            autoComplete="off"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirmer le Mot de passe</label>
        </div>
        <button onClick={handleSignUp}>Inscrivez-vous</button>
      </form>
      <p>
        Deja un compte ? <Link to="/connexion">Connectez-vous</Link>
      </p>
    </div>
  );
};

export default Inscription;
