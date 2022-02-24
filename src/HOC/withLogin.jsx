import { connect } from "react-redux";
import { Navigate } from "react-router";

const mapStateToProps = (state) => ({
  isAuth: state.app.isAuth,
});

const WithLogin = (Component) => {
  let WithLoginWithState = (props) => {
    return (
      <div>
        {props.isAuth ? <Component {...props} /> : <Navigate to="/login" />}
      </div>
    );
  };

  WithLoginWithState = connect(mapStateToProps)(WithLoginWithState);
  return WithLoginWithState;
};

export default WithLogin;
