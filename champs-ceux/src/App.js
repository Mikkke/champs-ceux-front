import React, { /* Component */ useState, useEffect } from "react";
import "./App.css";
import { setCurrentUser, clearCurrentUser } from "./actions/authAction";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/nav-bar/Nav";
import Accueil from "./components/body-components/Accueil";
import Produit from "./components/body-components/Produits";
import Contact from "./components/body-components/Contact";
import Panier from "./components/body-components/Panier";
//import SignUpContainer from "./containers/SignUpContainer";
import Inscription from "./components/compte-components/Inscription";
import Connexion from "./components/compte-components/Connexion";
/* import ProduitsCompte from "./components/compte-components/ProduitsCompte";
import Utilisateur from "./components/compte-components/UtilisateurCompte";
import Historique from "./components/compte-components/Historique.compte"; */
import NavCompte from "./components/compte-components/NavCompte";
import { connect } from "react-redux";
import RouterCompte from "./components/compte-components/RouterCompte";

const App = ({ currentUser, setCurrentUser, clearCurrentUser }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleNavbar = () => {
    /* this.setState({ navbarOpen: !this.state.navbarOpen }); */
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    /*  unsubscribeFromAuth = fireAuth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        console.log("user :", user);
      } else {
        clearCurrentUser();
      }
      
    }); */
    const loggedInUser = localStorage.getItem("auth");
    console.log("loggedInUser :>> ", loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
      console.log("foundUser :>> ", foundUser);
      console.log("yesss");
    }
    /*if (loggedInUser) {
      props.setCurrentUser(loggedInUser);
    } */
    //return () => unsubscribeFromAuth();
  }, []);
  return (
    <BrowserRouter>
      <Nav navbarState={navbarOpen} handleNavbar={handleNavbar} />
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/produits" component={Produit} />
        <Route path="/contact" component={Contact} />
        <Route path="/compte" component={Connexion} />
        {/* <Route path="/compte" component={Compte} /> */}
        <Route path="/panier" component={Panier} />
        {/* <Route path="/signup" component={SignUpContainer} /> */}
        <Route path="/inscription" component={Inscription} />
        {/* <Route path="/connexion" component={Connexion} /> */}
        {/* <Route path="/produitcomp" component={ProduitsCompte} />
        <Route path="/moncompte" component={Utilisateur} />
        <Route path="/historique" component={Historique} /> */}
        <RouterCompte />
        <Route path="/navCompte" component={NavCompte} />
        <Route path="/indexcompte" component={RouterCompte} />
      </Switch>
    </BrowserRouter>
  );
};

/* class App extends Component {
  state = {
    navbarOpen: false
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {
    console.log("this.props App :", this.props);
    return (
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
          {/* <Route path="/compte" component={Compte} /> */

/* <Route path="/panier" component={Panier} />
          <Route path="/signup" component={SignUpContainer} />
          <Route path="/inscription" component={Inscription} />
          <Route path="/connexion" component={Connexion} />
          <Route path="/produitcomp" component={Produits} />
          <Route path="/compte" component={Utilisateur} />
          <Route path="/historique" component={Historique} />
          <Route path="/navCompte" component={NavCompte} />
        </Switch>
      </BrowserRouter> */

// );
// }
//}
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearCurrentUser: () => dispatch(clearCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
