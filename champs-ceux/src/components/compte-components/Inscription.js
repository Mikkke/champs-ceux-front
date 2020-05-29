import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fireAuth, fireStore } from "../../firebase/Firebase";

const Inscription = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* const [isAdmin, setIsAdmin] = useState(true); */
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  //const user = uid => fireStore.doc(`users/${uid}`);
  const handleSignUp = e => {
    e.preventDefault();

    if (password === confirmPassword) {
      fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log("user :", user);
          props.history.push("/navCompte");
        })
        .catch(err => console.log("err :", err));
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
            autoComplete="off"
            placeholder="Pseudo..."
            required
            value={pseudo}
            onChange={e => setPseudo(e.target.value)}
          />

          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Email.."
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {/*     <div className="inputBox">
          <label>
            Admin:
            <input
              name="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={e => console.log(setIsAdmin(e.target.checked))}
            />
          </label>
        </div> */}

          <input
            type="password"
            id="password"
            autoComplete="off"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mot de passe.."
          />

          <input
            type="password"
            id="confirmPassword"
            autoComplete="off"
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
