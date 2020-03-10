import { connect } from "react-redux";
import SignUp from "../components/body-components/SignUp";
import { checkToken } from "../actions/checkToken";

const mapStateToProps = (state, props) => ({
  userProps: state.UserState
});

const mapDispatchToProps = dispatch => ({
  checkToken: () => dispatch(checkToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
