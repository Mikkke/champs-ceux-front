import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
//import Footer from "./components/footer/Footer";
import Accueil from "./components/body-components/Accueil";
import Produit from "./components/body-components/Produits";
import Contact from "./components/body-components/Contact";
import Compte from "./components/body-components/Compte";
import Panier from "./components/body-components/Panier";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter className="App">
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
    </Provider>
  );
}

export default App;
