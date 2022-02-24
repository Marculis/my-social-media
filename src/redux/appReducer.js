import { authAPI } from "./../API/api";

const GET_AUTH = "GET_AUTH";
const SET_CAPTCHA = "SET_CAPTCHA";

const initialState = {
  isAuth: false,
  id: null,
  email: null,
  login: null,
  captcha: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
        id: action.id,
        email: action.email,
        login: action.login,
        captcha: null,
      };
    case SET_CAPTCHA:
      return { ...state, captcha: action.url };
    default:
      return state;
  }
};

export const setAuth = (authData, isAuth) => ({
  type: GET_AUTH,
  id: authData.id,
  email: authData.email,
  login: authData.login,
  isAuth: isAuth,
});

const setCaptcha = (url) => ({
  type: SET_CAPTCHA,
  url,
});

export const getAuth = () => async (dispatch) => {
  let authData = await authAPI.authMe();
  if (authData.resultCode === 0) {
    dispatch(setAuth(authData.data, true));
  } else dispatch(setAuth(authData.data, false));
};

export const getLogin = (loginData) => async (dispatch) => {
  let responseData = await authAPI.setMeLogin(loginData);
  if (responseData.resultCode === 0) {
    dispatch(getAuth());
  } else {
    if (responseData.resultCode === 10) {
      dispatch(getCaptcha());
      return responseData.messages[0];
    } else {
      return responseData.messages[0];
    }
  }
};

export const getLogout = () => async (dispatch) => {
  let response = await authAPI.setMeLogout();
  if (response.resultCode === 0) {
    dispatch(getAuth());
  }
};

export const getCaptcha = () => async (dispatch) => {
  const response = await authAPI.getCaptcha();
  dispatch(setCaptcha(response));
};

export default appReducer;
