import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  postTextOnchange,
  addPost,
  postTitleOnchange,
  addLike,
  getProfile,
  getStatus,
  putStatus,
  putProfilePhoto,
  editProfile,
} from "../../redux/profileReducer";
import Profile from "./profile";
import WithLogin from "./../../HOC/withLogin";
import { useParams } from "react-router";
import { followUser, unfollowUser } from "./../../redux/usersReducer";
import { usersAPI } from "../../API/api";
import Preloader from "../components/preloader";

const ProfileContainer = (props) => {
  const [isFriend, setIsFriend] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const par = useParams();
  let userId = par.id;
  userId = parseInt(userId);

  let profileId = props.profile && props.profile.userId;

  useEffect(() => {
    loadProcess();
    loadMode();
  }, [userId, isFriend, profileId]);

  const loadProcess = () => {
    getProfileEdition();
    getIsFriend(userId);
    props.getProfile(userId);
    props.getStatus(userId);
  };

  const loadMode = () => {
    profileId === userId ? setLoadingPage(false) : setLoadingPage(true);
  };

  const getProfileEdition = () => {
    if (!props.profile || props.myId === userId) {
      setIsMyProfile(true);
      return isMyProfile;
    }
  };

  const getIsFriend = async (userId) => {
    const response = await usersAPI.isFollow(userId);
    setIsFriend(response.data);
    return isFriend;
  };

  return (
    <div>
      {loadingPage ? (
        <Preloader />
      ) : (
        <Profile
          {...props}
          isFriend={isFriend}
          isMyProfile={isMyProfile}
          getIsFriend={getIsFriend}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.profile.posts,
  newPostTitle: state.profile.newPostTitle,
  newPostText: state.profile.newPostText,
  profile: state.profile.profile,
  myId: state.app.id,
  status: state.profile.status,
});

export default compose(
  connect(mapStateToProps, {
    postTextOnchange,
    postTitleOnchange,
    addPost,
    addLike,
    getProfile,
    getStatus,
    putStatus,
    putProfilePhoto,
    editProfile,
    followUser,
    unfollowUser,
  }),
  WithLogin
)(ProfileContainer);
