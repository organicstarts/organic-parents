import {
  AUTH_LOGIN_LOADED,
  AUTH_SIGNUP_LOADED,
  AUTH_LOGOUT_LOADED
} from "../constants";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
};

const setUser = (state, action) => {
  if (action.payload.errmsg) {
    return Object.assign({}, state, {
      error: ""
    });
  }

  let userInfo = {};
  const keys = Object.keys(action.payload.user);
  keys.forEach(key => (userInfo[key] = action.payload.user[key]));
  return Object.assign({}, state, userInfo);
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGIN_LOADED: {
      return setUser(state, action);
    }
    case AUTH_SIGNUP_LOADED: {
      return setUser(state, action);
    }
    case AUTH_LOGOUT_LOADED: {
      return { ...INITIAL_STATE };
    }
    case "API_ERRORED": {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
}

export default userReducer;
