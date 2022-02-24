import gif from "../../assets/others/preloader.gif";
import css from "./preloader.module.css";

const Preloader = () => {
  return (
    <div className={css.preloader}>
      <img src={gif} alt="gif" />
    </div>
  );
};
export default Preloader;
