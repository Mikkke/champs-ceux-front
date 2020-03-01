import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      <div className="form-div">
        <form>
          <label>Nom :</label>
          <input type="text" />
          <label>Prenom :</label>
          <input type="text" />
          <label>Mail :</label>
          <input type="email" />
          <label>Je suis :</label>
          <select id="cars" name="carlist" form="carform">
            <option value="agriculteur">Agriculteur</option>
            <option value="acheteur">Acheteur</option>
          </select>
          <label>Commentaire :</label>
          <textarea></textarea>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
