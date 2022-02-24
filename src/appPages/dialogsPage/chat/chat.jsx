import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getMessagesWithUser,
  sendMessageToUser,
  deleteMessage,
} from "../../../redux/dialogsReducer";
import { useParams } from "react-router";
import css from "./chat.css";
import { useNavigate } from "react-router-dom";
import deleteImg from "../../../assets/icons/delete.png";
import Preloader from "../../components/preloader";

const Chat = (props) => {
  const [message, setMessage] = useState();
  const [loadingPage, setLoadingPage] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  let userId = params.id;
  userId = parseInt(userId);

  let profileId = props.profile && props.profile.userId;

  useEffect(() => {
    loadMode();
    props.getMessagesWithUser(userId || props.myId);
  }, [userId, profileId]);

  const sendMessage = () => {
    props.sendMessageToUser(userId, { body: message });
    setMessage("");
  };
  const onchangeMessageText = (e) => {
    setMessage(e.currentTarget.value);
  };

  const loadMode = () => {
    profileId === userId ? setLoadingPage(false) : setLoadingPage(true);
  };

  return (
    <div className="mainBlock">
      <div>
        {userId ? (
          <span className="conversation">
            Conversation with{" "}
            <span
              className="speakerName"
              onClick={() => {
                navigate(`/profile/${props.profile.userId}`);
              }}
            >
              {" "}
              {props.profile && props.profile.fullName}
            </span>
          </span>
        ) : (
          <span className="conversation"> Chat with somebody</span>
        )}
        <textarea
          disabled={!userId && "disabled"}
          onChange={onchangeMessageText}
          placeholder="Enter message text here..."
          value={message}
        ></textarea>
        <button className="btnSend" onClick={sendMessage}>
          Send message
        </button>

        {loadingPage ? (
          <Preloader />
        ) : (
          <div>
            {props.messagesList.map((item) => {
              if (item.senderId === props.myId) {
                return (
                  <div className={"messageItem"} key={item.id}>
                    <div className={"myMessage"}>
                      <img
                        className="deleteImg"
                        src={deleteImg}
                        alt=""
                        onClick={() => {
                          props.deleteMessage(item.recipientId, item.id);
                        }}
                      />
                      {item.body}
                      <div className="messageInfo">
                        {item.viewed ? (
                          <span className="viewedMes">Viewed</span>
                        ) : (
                          <span className="unViewedMes">Doesn't viewed</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else
                return (
                  <div className={"messageItem"} key={item.id}>
                    <div className={"myFriendMessage"}>{item.body}</div>
                    <img
                      className="deleteImg"
                      src={deleteImg}
                      alt=""
                      onClick={() => {
                        props.deleteMessage(item.senderId, item.id);
                      }}
                    />
                  </div>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  messagesList: state.dialogs.messagesList,
  myId: state.app.id,
});
export default connect(mapStateToProps, {
  getMessagesWithUser,
  sendMessageToUser,
  deleteMessage,
})(Chat);
