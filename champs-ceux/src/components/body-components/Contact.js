import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contacts</h1>
      <div className="container-contact">
        <form className="form-div">
          <label>Nom</label>
          <input type="text" />
          <label>Prenom</label>
          <input type="text" />
          <label>Mail</label>
          <input type="email" />
          <label>Je suis</label>
          <select id="cars" name="carlist" form="carform">
            <option value="agriculteur">Agriculteur</option>
            <option value="acheteur">Acheteur</option>
          </select>
          <label>Commentaire</label>
          <textarea />
          <input type="submit" className="send" value="Envoyer" />
        </form>

        <div className="reseaux">
          <h1>Email :</h1>
          <a href="/">champsceux@champceux.com</a>
          <h2>Retrouvez nous sur :</h2>
          <div className="social">
            <a href="/" className="insta">
              <FaInstagram size={60} />
            </a>
            <a href="/" className="facebook">
              <FaFacebookF size={60} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
