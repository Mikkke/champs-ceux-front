import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavCompte from "./NavCompte";

import Utilisateur from "./UtilisateurCompte";
import Historique from "./Historique.compte";
import ProduitsCompte from "./ProduitsCompte";
import Achat from "./Achat";

const RouterCompte = () => {
  return (
    //indexcompte
    // <BrowserRouter /* basename="/navCompte" */>
    <div className="main-compte">
      <NavCompte />
      <Switch>
        <Route path="/produitscompte" component={ProduitsCompte} />
        <Route path="/moncompte" component={Utilisateur} />
        <Route path="/historique" component={Historique} />
        <Route path="/achat" component={Achat} />
      </Switch>
    </div>
    // </BrowserRouter>
  );
};

export default RouterCompte;
