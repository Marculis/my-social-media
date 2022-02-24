import fbLogo from "../../../assets/logos/Facebook.png";
import gitLogo from "../../../assets/logos/github.svg";
import igLogo from "../../../assets/logos/instagram.png";
import mlLogo from "../../../assets/logos/mainLink.png";
import twLogo from "../../../assets/logos/twitter.png";
import vkLogo from "../../../assets/logos/vk.svg";
import webLogo from "../../../assets/logos/website.png";
import youLogo from "../../../assets/logos/youtube.png";
import css from "./contactItem.css";

const Contact = ({ contactName, contactUrl }) => {
  const linkOnFocus = (e) => {
    e.currentTarget.className = "contactItemHover";
  };
  const linkOnLeave = (e) => {
    e.currentTarget.className = "contactItem";
  };
  const setContactImg = (contactName) => {
    switch (contactName) {
      case "facebook": {
        return fbLogo;
      }
      case "github": {
        return gitLogo;
      }
      case "instagram": {
        return igLogo;
      }
      case "mainLink": {
        return mlLogo;
      }
      case "twitter": {
        return twLogo;
      }
      case "vk": {
        return vkLogo;
      }
      case "website": {
        return webLogo;
      }
      case "youtube": {
        return youLogo;
      }
      default:
        return "error";
    }
  };
  return (
    <a
      className="contactItem"
      onMouseMove={linkOnFocus}
      onMouseLeave={linkOnLeave}
      href={contactUrl}
    >
      <img src={setContactImg(contactName)} alt={contactName} />
    </a>
  );
};
export default Contact;
