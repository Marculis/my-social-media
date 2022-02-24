import { applyMiddleware, combineReducers, createStore } from "redux";
import usersReducer from "./usersReducer";
import profileReducer from "./profileReducer";
import appReducer from "./appReducer";
import thunk from "redux-thunk";
import dialogsReducer from "./dialogsReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
  users: usersReducer,
  app: appReducer,
  dialogs: dialogsReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
window.store = store;
export default store;
