import React from "react";
import { Switch, Route } from "react-router-dom";
import Accueil from "../nav/Accueil";
import Produits from "../nav/Produits";
import Contact from "../nav/Contact";
import Compte from "../nav/Compte";
import Panier from "../nav/Panier";

const Main = () => {
  return (
    <div>
      <Switch>
        <Route path="/" components={Accueil} />
        <Route path="/Produits" components={Produits} />
        <Route path="/Contact" components={Contact} />
        <Route path="/Compte" components={Compte} />
        <Route path="/Panier" components={Panier} />
      </Switch>
    </div>
  );
};

export default Main;
