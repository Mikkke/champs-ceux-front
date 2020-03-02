import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Accueil from "../body-components/Accueil";
import Produit from "../body-components/Produits";
import Contact from "../body-components/Contact";
import Compte from "../body-components/Compte";
import Panier from "../body-components/Panier";
import "./main.css";
import Header from "../header/Header";

const Main = () => {
  return (
    <div className="main-div">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Accueil}></Route>
          <Route path="/produits" component={Produit} />
          <Route path="/contact" component={Contact} />
          <Route path="/compte" component={Compte} />
          <Route path="/panier" component={Panier} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default Main;
