import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavCompte from "./NavCompte";

import Utilisateur from "./UtilisateurCompte";
import Historique from "./Historique.compte";
import ProduitsCompte from "./ProduitsCompte";

const RouterCompte = () => {
  return (
    <BrowserRouter basename="indexcompte">
      <div className="main-compte">
        <NavCompte />
        <Switch>
          <Route path="/produitscompte" component={ProduitsCompte} />
          <Route path="/moncompte" component={Utilisateur} />
          <Route path="/historique" component={Historique} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default RouterCompte;
