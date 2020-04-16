import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fireAuth } from "../../firebase/Firebase";
import { setCurrentUser, clearCurrentUser } from "../../actions/auth2Action";

const IndexCompte = ({ currentUser, setCurrentUser, clearCurrentUser }) => {
  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = fireAuth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        clearCurrentUser();
      }
    });

    return () => unsubscribeFromAuth();
  }, [currentUser, setCurrentUser, clearCurrentUser]);

  return (
    <div className="compte-div">
      <Link to="/inscription">Inscription</Link>
      <Link to="/connexion">Connexion</Link>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearCurrentUser: () => dispatch(clearCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexCompte);
