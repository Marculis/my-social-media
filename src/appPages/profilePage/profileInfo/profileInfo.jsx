import React, { useState } from "react";
import Contact from "./contactItem";
import css from "./profileInfo.module.css";
import ProfileInfoEdit from "./profileInfoEdit";
import Status from "./status";
import loadIcon from "../../../assets/icons/upload.jpg";
import profilePhoto from "../../../assets/icons/profilePhoto.jpg";
import { useNavigate } from "react-router-dom";

const ProfileInfo = (props) => {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const choosePhoto = (e) => {
    e.preventDefault();
    props.putProfilePhoto(e.currentTarget.files[0]);
  };

  const toggleEditMode = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  return (
    <div>
      {props.profile && !editMode && (
        <div className={css.profileInfoContainer}>
          <div className={css.contacts}>
            {Object.entries(props.profile.contacts).map((item) => {
              if (item[1])
                return (
                  <Contact
                    key={item[0]}
                    contactName={item[0]}
                    contactUrl={item[1]}
                  />
                );
            })}
          </div>

          <div className={css.profileImg}>
            {<img src={props.profile.photos.large || profilePhoto} alt="" />}
            {props.isMyProfile ? (
              <form>
                <label htmlFor="fileLoad">
                  <img src={loadIcon} alt="" />
                </label>
                <input type="file" id="fileLoad" onChange={choosePhoto} />
                <span className={css.editProfile}>
                  {!editMode && (
                    <button onClick={toggleEditMode}>Edit Profile</button>
                  )}
                </span>
              </form>
            ) : (
              <div className={css.subscribe}>
                <button
                  onClick={() => {
                    navigate(`/chat/${props.profile.userId}`);
                  }}
                >
                  Open chat
                </button>
                {props.isFriend ? (
                  <button
                    onClick={() => {
                      props.unfollowUser(props.profile.userId);
                      props.getIsFriend(props.profile.userId);
                    }}
                  >
                    unSubscribe
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      props.followUser(props.profile.userId);
                      props.getIsFriend(props.profile.userId);
                    }}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={css.profileInfo}>
            <h4>{props.profile.fullName}</h4>
            <Status
              isMyProfile={props.isMyProfile}
              status={props.status}
              putStatus={props.putStatus}
            />
            <div className={css.descriptionItem}>
              <b>About me:</b> {props.profile.aboutMe}
            </div>
            <div className={css.descriptionItem}>
              <b>My skills:</b> {props.profile.lookingForAJobDescription}
            </div>
            <div className={css.descriptionItem}>
              {props.profile.lookingForAJob ? (
                <div className={css.needJob}>Searching for a new job</div>
              ) : (
                <div className={css.works}>Already have a job</div>
              )}
            </div>
          </div>
        </div>
      )}

      {props.profile && editMode && (
        <ProfileInfoEdit
          editProfile={props.editProfile}
          profile={props.profile}
          toggleEditMode={toggleEditMode}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
