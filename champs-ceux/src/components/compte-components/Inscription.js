import React, { useState } from "react";
import { Link } from "react-router-dom";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [profilType, setProfilType] = useState("");
  const [adress, setAdress] = useState("");
  const handleSignUp = e => {
    e.preventDefault();

    if (password === confirmPassword) {
      console.log("password :>> ", password);
    } else {
      alert("les mot de passe ne correspondent pas");
    }
  };

  return (
    <div className="inscription-div">
      <div className="wrap-inscription">
        <h2>Inscription</h2>
        <form>
          <input
            type="text"
            id="pseudo"
            placeholder="Nom..."
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            id="email"
            placeholder="Email.."
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <div className="inputBox">
            <label>Je suis</label>
            <select name="people" form="carform" className="select">
              <option value="agriculteur">Agriculteur</option>
              <option value="acheteur">Acheteur</option>
            </select>
          </div>

          <input
            type="text"
            id="password"
            required
            value={adress}
            onChange={e => setAdress(e.target.value)}
            placeholder="Adresse.."
            disabled
          />
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mot de passe.."
          />

          <input
            type="password"
            id="confirmPassword"
            required
            placeholder="confirmer mot de passe.."
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Inscrivez-vous</button>
        </form>
        <p>
          Deja un compte ? <Link to="/compte">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Inscription;
