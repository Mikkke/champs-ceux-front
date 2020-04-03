import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
/* import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
//import Footer from "./components/footer/Footer";
import Accueil from "./components/body-components/Accueil";
import Produit from "./components/body-components/Produits";
import Contact from "./components/body-components/Contact";
import Compte from "./components/body-components/Compte";
import Panier from "./components/body-components/Panier"; */
import { Provider } from "react-redux";
import store from "./store";
import Nav from "./components/nav-bar/Nav";
import Accueil from "./components/body-components/Accueil";
import Produit from "./components/body-components/Produits";
import Contact from "./components/body-components/Contact";
/* import Compte from "./components/body-components/Compte"; */
import Panier from "./components/body-components/Panier";
/* import SignUp from "./components/body-components/SignUp"; */
import SignUpContainer from "./containers/SignUpContainer";
import IndexCompte from "./components/body-components/IndexCompte";
import Inscription from "./components/compte-components/Inscription";
import Connexion from "./components/compte-components/Connexion";

class App extends Component {
  state = {
    navbarOpen: false
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Nav
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
          <Switch>
            <Route exact path="/" component={Accueil} />
            <Route path="/produits" component={Produit} />
            <Route path="/contact" component={Contact} />
            <Route path="/compte" component={IndexCompte} />
            {/* <Route path="/compte" component={Compte} /> */}
            <Route path="/panier" component={Panier} />
            <Route path="/signup" component={SignUpContainer} />
            <Route path="/inscription" component={Inscription} />
            <Route path="/connexion" component={Connexion} />
          </Switch>
          {/* <Footer /> */}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
