import { usersAPI } from "../API/api";

const GET_USERS = "GET_USERS";
const SET_PAGE = "SET_PAGE";
const SET_IS_FOLLOW = "SET_IS_FOLLOW";
const FOLLOW_USER = "FOLLOW_USER";

const initialState = {
  pageSize: 16,
  page: 1,
  totalUsersCount: null,
  currentUsers: null,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        currentUsers: action.users,
        totalUsersCount: action.totalUsersCount,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case FOLLOW_USER:
      return {
        ...state,
      };
    case SET_IS_FOLLOW:
      return {
        ...state,
        currentUsers: [
          ...state.currentUsers.map((user) => {
            if (user.id === action.userId) {
              user.followed = action.response;
              return user;
            }
            return user;
          }),
        ],
      };
    default:
      return state;
  }
};

const setUsers = (data) => ({
  type: GET_USERS,
  users: data.items,
  totalUsersCount: data.totalCount,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});

const setIsFollow = (userId, response) => ({
  type: SET_IS_FOLLOW,
  userId,
  response,
});

export const getUsers =
  (pageSize, pageNumber, searchName, isFriend) => async (dispatch) => {
    const response = await usersAPI.getUsers(
      pageSize,
      pageNumber,
      searchName,
      isFriend
    );
    dispatch(setUsers(response));
  };

export const followUser = (userId) => async (dispatch) => {
  const response = await usersAPI.followUser(userId);
  if (response.resultCode === 0) {
    dispatch(setIsFollow(userId, true));
  }
};

export const unfollowUser = (userId) => async (dispatch) => {
  const response = await usersAPI.unfollowUser(userId);
  if (response.resultCode === 0) {
    dispatch(setIsFollow(userId, false));
  }
};

export const getIsFriend = async (userId) => {
  const response = await usersAPI.isFollow(userId);
  return response.data;
};
export default friendsReducer;
