import React, { useState } from "react";
import { useEffect } from "react";
import Paginator from "../components/paginator/paginator";
import css from "./friends.module.css";
import userIcon from "../../assets/icons/user.png";
import { useNavigate } from "react-router-dom";
import Preloader from "./../components/preloader";

const Friends = (props) => {
  const [friendsMode, setFriendsMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPage();
  }, [props.pageNumber, friendsMode]);

  let loadPage = (userName) => {
    friendsMode
      ? props.getUsers(props.pageSize, props.pageNumber, userName, true)
      : props.getUsers(props.pageSize, props.pageNumber, userName);
  };
  const loadUserProfile = (userId) => {
    navigate(`/profile/${userId}`, { replace: true });
  };
  const showFriends = (toggle) => {
    setFriendsMode(toggle);
    props.setPage(1);
  };

  return (
    <div>
      <Paginator
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        pageNumber={props.pageNumber}
        setPage={props.setPage}
      />
      <div className={css.findBlock}>
        {friendsMode ? (
          <button
            className={css.usersToggle}
            onClick={() => {
              showFriends(false);
            }}
          >
            Show all users
          </button>
        ) : (
          <button
            className={css.usersToggle}
            onClick={() => {
              showFriends(true);
            }}
          >
            Show my friends
          </button>
        )}
        <input
          className={css.searchInput}
          type="text"
          onChange={(e) => loadPage(e.currentTarget.value)}
          placeholder="Enter user name for searching..."
        />
      </div>
      <div className={css.allUsers}>
        {props.users ? (
          props.users.map((item) => {
            return (
              <div
                className={css.userItem}
                key={item.id}
                onClick={() => loadUserProfile(item.id)}
              >
                <div>
                  {item.photos.large ? (
                    <img
                      className={css.avaPhoto}
                      src={item.photos.large}
                      alt=""
                    />
                  ) : (
                    <img className={css.avaPhoto} src={userIcon} alt="" />
                  )}
                </div>
                <div className={css.userInfo}>
                  <h4>{item.name}</h4>
                  <span>
                    {item.status ? item.status : "This user hasn't a status"}
                  </span>
                  <span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/chat/${item.id}`);
                        props.getProfile(item.id);
                      }}
                    >
                      Open chat
                    </button>
                  </span>
                  <span>
                    {item.followed ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          props.unfollowUser(item.id);
                        }}
                      >
                        UnSubscribe
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          props.followUser(item.id);
                        }}
                      >
                        Subscribe
                      </button>
                    )}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <Preloader />
        )}
      </div>{" "}
      <Paginator
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        pageNumber={props.pageNumber}
        setPage={props.setPage}
      />
    </div>
  );
};

export default Friends;
