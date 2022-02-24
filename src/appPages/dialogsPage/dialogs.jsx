import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getDialogs, getMessagesWithUser } from "./../../redux/dialogsReducer";
import css from "./dialogs.module.css";
import Chat from "../dialogsPage/chat/chat";
import { getProfile } from "./../../redux/profileReducer";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
import WithLogin from "../../HOC/withLogin";
import defaultAva from "../../assets/icons/profilePhoto.jpg";
import Preloader from "../components/preloader";

const Dialogs = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    props.getDialogs();
  }, [props.messagesList]);

  const startConversation = (userId) => {
    props.getMessagesWithUser(userId);
    props.getProfile(userId);
  };

  const getDate = (date) => {
    date = date.split("T");
    let day = date[0];
    let time = date[1];
    //time = time.split(".");
    time = time.slice(0, 5);
    let result = `${day} in ${time}`;
    return result;
  };
  return (
    <div className={css.dialogsContainer}>
      {props.dialogs ? (
        <div className={css.dialogsBlock}>
          {props.dialogs.map((item) => {
            return (
              <div
                onClick={() => {
                  startConversation(item.id);
                  navigate(`/dialogs/${item.id}`);
                }}
                className={
                  item.newMessagesCount > 0 ? css.dialogItemNew : css.dialogItem
                }
                key={item.id}
              >
                <div>
                  <img
                    src={item.photos.small ? item.photos.small : defaultAva}
                    alt=""
                  />
                </div>
                <div>
                  <h6>{item.userName}</h6>
                  <div className={css.activity}>
                    Last activity <b>{getDate(item.lastUserActivityDate)}</b>
                  </div>{" "}
                  {item.newMessagesCount > 0 && (
                    <span>
                      <b>{item.newMessagesCount}</b> new message(s)
                    </span>
                  )}
                  <button
                    className={css.openChat}
                    onClick={(e) => {
                      e.stopPropagation();
                      startConversation(item.id);
                      navigate(`/chat/${item.id}`);
                    }}
                  >
                    Open Chat
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Preloader />
      )}
      <div className={css.chat}>
        <Chat />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dialogs: state.dialogs.dialogs,
  profile: state.profile.profile,
  messagesList: state.dialogs.messagesList,
});
export default compose(
  connect(mapStateToProps, {
    getDialogs,
    getMessagesWithUser,
    getProfile,
  }),
  WithLogin
)(Dialogs);
