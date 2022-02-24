import React from "react";
import { connect } from "react-redux";
import WithLogin from "../../HOC/withLogin";
import { compose } from "redux";
import {
  getUsers,
  setPage,
  followUser,
  unfollowUser,
} from "../../redux/usersReducer";
import Friends from "./friends";
import { getProfile, getStatus } from "./../../redux/profileReducer";

const FriendsContainer = (props) => {
  return <Friends {...props} />;
};

const mapStateToProps = (state) => ({
  users: state.users.currentUsers,
  totalUsersCount: state.users.totalUsersCount,
  pageSize: state.users.pageSize,
  pageNumber: state.users.page,
});

export default compose(
  connect(mapStateToProps, {
    getUsers,
    setPage,
    followUser,
    unfollowUser,
    getProfile,
    getStatus,
  }),
  WithLogin
)(FriendsContainer);
