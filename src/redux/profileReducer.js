import { profileAPI } from "../API/api";

const UPDATE_POST_TEXT = "UPDATE_POST_TEXT";
const ADD_POST = "ADD_POST";
const UPDATE_POST_TITLE = "UPDATE_POST_TITLE";
const ADD_LIKES = "ADD_LIKES";
const GET_PROFILE = "GET_PROFILE";
const GET_STATUS = "GET_STATUS";
const SET_PHOTO = "SET_PHOTO";

const initialState = {
  posts: [
    { id: 1, title: "first", text: "My first post", likes: 4 },
    { id: 2, title: "second", text: "My second post", likes: 5098 },
    { id: 3, title: "third", text: "My third post", likes: 200 },
    { id: 4, title: "fourth", text: "My fourth post", likes: 369 },
  ],
  newPostText: "",
  newPostTitle: "",
  profile: null,
  status: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POST_TEXT:
      return { ...state, newPostText: action.newPostText };
    case UPDATE_POST_TITLE:
      return { ...state, newPostTitle: action.newPostTitle };
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        title: state.newPostTitle,
        text: state.newPostText,
        likes: 0,
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
        newPostText: "",
        newPostTitle: "",
      };
    case ADD_LIKES:
      return {
        ...state,
        posts: [
          ...state.posts.map((item) => {
            if (item.id === action.postId) item.likes = item.likes + 1;
            return item;
          }),
        ],
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.profileData,
      };
    case GET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SET_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photo },
      };

    default:
      return state;
  }
};

export const postTextOnchange = (newPostText) => ({
  type: UPDATE_POST_TEXT,
  newPostText,
});
export const postTitleOnchange = (newPostTitle) => ({
  type: UPDATE_POST_TITLE,
  newPostTitle,
});
export const addPost = () => ({
  type: ADD_POST,
});

export const addLike = (postId) => ({
  type: ADD_LIKES,
  postId,
});

const setProfile = (profileData) => ({
  type: GET_PROFILE,
  profileData,
});

const setStatus = (status) => ({
  type: GET_STATUS,
  status,
});
const setProfilePhoto = (photo) => ({
  type: SET_PHOTO,
  photo,
});

export const getProfile = (userId) => async (dispatch) => {
  const profileData = await profileAPI.getProfile(userId);
  dispatch(setProfile(profileData));
};

export const getStatus = (userId) => async (dispatch) => {
  const status = await profileAPI.getStatus(userId);
  dispatch(setStatus(status));
};

export const putStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const putProfilePhoto = (photo) => async (dispatch) => {
  const data = await profileAPI.loadProfilePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(setProfilePhoto(data.data.photos));
  }
};

export const editProfile = (profileData) => async (dispatch) => {
  const data = await profileAPI.editProfile(profileData);
  if (data.data.resultCode === 0) dispatch(getProfile(profileData.userId));
  else {
    let error = data.data.messages[0].split("Invalid url format (Contacts->");
    error = error[1].split(")");
    error = error.join("").split("");
    error[0] = error[0].toLowerCase();
    error = error.join("");
    return { contacts: { [error]: `Invalid ${error} url format` } };
  }
};

export default profileReducer;
