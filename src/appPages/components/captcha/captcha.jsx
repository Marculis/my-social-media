import { InputComponent } from "../formComponent/formComponent";
import css from "./captcha.css";
import refreshImg from "../../../assets/icons/refresh.png";

const Captcha = (props) => {
  return (
    <div>
      {props.captcha && (
        <div className="captchaBlock">
          <img className="captchaImg" src={props.captcha} alt="" />{" "}
          <img
            className="refreshImg"
            src={refreshImg}
            onClick={() => {
              props.getCaptcha();
            }}
            alt=""
          />
          {InputComponent("captcha", "Captcha", true, null)}
        </div>
      )}
    </div>
  );
};
export default Captcha;
