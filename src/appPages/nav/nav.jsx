import { NavLink } from "react-router-dom";
import listIcon from "../../assets/icons/list.png";
import close from "../../assets/icons/close.png";
import css from "./nav.css";
import { useState } from "react";

const Nav = (props) => {
  const [navMode, setNavMode] = useState(true);
  const toogleNav = () => {
    navMode ? setNavMode(false) : setNavMode(true);
  };
  return (
    <div>
      {navMode && (
        <nav>
          <span>
            <NavLink to={`/profile/${props.myId}`}>Profile</NavLink>
          </span>
          <span>
            <NavLink to="/friends">Friends</NavLink>
          </span>
          <span>
            <NavLink to="/dialogs">Dialogs</NavLink>
          </span>
          <span>
            <NavLink to="/settings">Settings</NavLink>
          </span>
        </nav>
      )}{" "}
      <span>
        <img
          className="listIcon"
          src={navMode ? close : listIcon}
          alt=""
          onClick={() => {
            toogleNav();
          }}
        />
      </span>
    </div>
  );
};
export default Nav;
