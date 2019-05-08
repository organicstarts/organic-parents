import authReducer from "./auth";
import userReducer from "./user";
import postReducer from "./post";

const rootReducer = {
  authState: authReducer,
  userState: userReducer,
  postState: postReducer
};

export default rootReducer;
