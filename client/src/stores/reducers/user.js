import {
  AUTH_LOGIN_LOADED,
  AUTH_SIGNUP_LOADED,
  AUTH_LOGOUT_LOADED,
  GET_USERS_COUNT_LOADED
} from "../constants";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  usersCount: 0
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
    case GET_USERS_COUNT_LOADED: {
      return Object.assign({}, state, {
        usersCount: action.payload.data.user
      });
    }
    case "API_ERRORED": {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
}

export default userReducer;
