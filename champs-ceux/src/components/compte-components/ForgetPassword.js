import React from "react";

const ForgetPassword = () => {
  return (
    <div className="forget-password">
      <div className="wrap">
        <h2>Mot de passe oublié</h2>
        <form>
          <input
            name="password"
            type="text"
            placeholder="Nouveau mot de passe..."
          />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
