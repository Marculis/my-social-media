import React from "react";
import ProfileInfo from "./profileInfo/profileInfo";
import ProfilePosts from "./profilePosts/profilePosts";
import css from "./profile.module.css";

const Profile = (props) => {
  return (
    <div className={css.profileContainer}>
      <div className={css.leftSide}>
        <ProfileInfo
          profile={props.profile}
          status={props.status}
          putStatus={props.putStatus}
          putProfilePhoto={props.putProfilePhoto}
          editProfile={props.editProfile}
          myId={props.myId}
          followUser={props.followUser}
          unfollowUser={props.unfollowUser}
          isFriend={props.isFriend}
          isMyProfile={props.isMyProfile}
          getIsFriend={props.getIsFriend}
        />
      </div>
      <div className={css.rightSide}>
        <ProfilePosts
          posts={props.posts}
          postTextOnchange={props.postTextOnchange}
          addPost={props.addPost}
          newPostText={props.newPostText}
          newPostTitle={props.newPostTitle}
          postTitleOnchange={props.postTitleOnchange}
          addLike={props.addLike}
        />
      </div>
    </div>
  );
};
export default Profile;
