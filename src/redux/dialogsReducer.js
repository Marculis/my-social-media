import { dialogsAPI } from "../API/api";

const SET_DIALOGS = "GET_DIALOGS";
const SET_MESSAGES_LIST = "SET_MESSAGES_LIST";

const initialState = {
  messagesList: [],
  dialogs: null,
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOGS:
      return {
        ...state,
        dialogs: action.dialogs,
      };
    case SET_MESSAGES_LIST:
      return { ...state, messagesList: action.list.reverse() };
    default:
      return state;
  }
};

const setDialogs = (dialogs) => ({
  type: SET_DIALOGS,
  dialogs,
});

const setMessagesList = (list) => ({
  type: SET_MESSAGES_LIST,
  list,
});

export const getDialogs = () => async (dispatch) => {
  const response = await dialogsAPI.getDialogs();
  dispatch(setDialogs(response));
};

export const getMessagesWithUser = (userId) => async (dispatch) => {
  const messages = await dialogsAPI.getMessagesWithUser(userId);
  dispatch(setMessagesList(messages.items));
};

export const sendMessageToUser = (userId, message) => async (dispatch) => {
  await dialogsAPI.postMessageToUser(userId, message);
  dispatch(getMessagesWithUser(userId));
};

export const deleteMessage = (userId, messageId) => async (dispatch) => {
  const response = await dialogsAPI.deleteMessage(messageId);
  if (response.resultCode === 0) {
    dispatch(getMessagesWithUser(userId));
  }
};
export default dialogsReducer;
