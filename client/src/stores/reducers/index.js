import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";

const rootReducer = combineReducers({
  authState: authReducer,
  userState: userReducer
});

export default rootReducer;
