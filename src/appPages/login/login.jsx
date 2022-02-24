import { Form } from "react-final-form";
import { InputComponent } from "./../components/formComponent/formComponent";
import css from "./login.module.css";
import { connect } from "react-redux";
import { getLogin, getCaptcha } from "./../../redux/appReducer";
import { Navigate } from "react-router-dom";
import Captcha from "../components/captcha/captcha";
import { FORM_ERROR } from "final-form";

const Login = (props) => {
  const onSubmit = async (values) => {
    let ans = await props.getLogin(values);
    if (ans) {
      return { [FORM_ERROR]: ans };
    }
  };

  let capUrl = props.captcha;
  const getCaptcha = props.getCaptcha;

  return (
    <div>
      {props.isAuth ? (
        <Navigate to="/profile" />
      ) : (
        <div className={css.loginBlock}>
          <Form
            onSubmit={onSubmit}
            render={({ submitError, handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                {InputComponent("email", "E-mail", true, null)}
                {InputComponent("password", "Password", true, "password")}
                {InputComponent("rememberMe", "Remember Me", false, "checkbox")}

                <Captcha captcha={capUrl} getCaptcha={getCaptcha} />

                {submitError && (
                  <div className={css.formError}> {submitError}</div>
                )}
                <button className={css.formBtn} type="submit">
                  Submit
                </button>
                <button
                  className={css.formBtn}
                  type="button"
                  onClick={form.reset}
                >
                  Reset
                </button>
              </form>
            )}
          />
          {/*  <Form onSubmit={onSubmit}>
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                {InputComponent("email", "E-mail", true, null)}
                {InputComponent("password", "Password", true, "password")}
                {InputComponent("rememberMe", "Remember Me", false, "checkbox")}
                <Captcha captcha={capUrl} getCaptcha={getCaptcha} />
                <button type="submit">Submit</button>
              </form>
            )}
          </Form> */}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.app.isAuth,
  captcha: state.app.captcha,
});
export default connect(mapStateToProps, { getLogin, getCaptcha })(Login);
