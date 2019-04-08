import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
import postReducer from "./post";

const rootReducer = combineReducers({
  authState: authReducer,
  userState: userReducer,
  postState: postReducer
});

export default rootReducer;
