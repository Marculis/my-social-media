import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getLogout } from "../../redux/appReducer";

const Header = (props) => {
  let navigate = useNavigate();

  const [isMenu, setMenu] = useState(false);

  useEffect(() => {}, [isMenu, props.login]);

  const menuToogle = () => {
    setMenu(isMenu ? false : true);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <header>
      <div>
        {props.login ? (
          <button onClick={menuToogle}>{props.login} </button>
        ) : (
          <button className="loginBtn" onClick={redirectToLogin}>
            Login
          </button>
        )}
        {isMenu && props.login && (
          <span>
            {" "}
            <button
              className="loginBtn"
              onClick={() => {
                props.getLogout();
                menuToogle();
              }}
            >
              Logout
            </button>
          </span>
        )}
      </div>
      <div> My Social Media </div>
      <div></div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  login: state.app.login,
});

export default connect(mapStateToProps, { getLogout })(Header);
