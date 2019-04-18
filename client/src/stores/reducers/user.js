import {
  AUTH_LOGIN_LOADED,
  AUTH_SIGNUP_LOADED,
  AUTH_LOGOUT_LOADED,
  GET_USERS_COUNT_LOADED,
  GET_USER_LOADED,
  BAN_USER_LOADED,
  CHANGE_ROLE_LOADED,
  UPDATE_USER_LOADED
} from "../constants";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  about: "",
  usersCount: 0,
  otherUser: {}
};

const setUser = (state, action) => {
  if (action.payload.msg) {
    return Object.assign({}, state, {
      error: ""
    });
  }
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

const setUserInfo = (state, action) => {
  if (action.payload.errmsg) {
    return Object.assign({}, state, {
      error: ""
    });
  }

  let userInfo = {};
  const keys = Object.keys(action.payload.data);
  keys.forEach(key => (userInfo[key] = action.payload.data[key]));
  return Object.assign({}, state, { otherUser: userInfo });
};

const setBanInfo = (state, action) => {
  const banUser = { ...state.otherUser };
  banUser.ban = action.payload.data.ban;
  return Object.assign({}, state, {
    otherUser: banUser
  });
};

const setRoleInfo = (state, action) => {
  const userRole = { ...state.otherUser };
  userRole.role = action.payload.data.role;
  return Object.assign({}, state, {
    otherUser: userRole
  });
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
    case GET_USER_LOADED: {
      return setUserInfo(state, action);
    }
    case BAN_USER_LOADED: {
      return setBanInfo(state, action);
    }
    case CHANGE_ROLE_LOADED: {
      return setRoleInfo(state, action);
    }
    case UPDATE_USER_LOADED: {
      return setUser(state, action);
    }
    case "API_ERRORED": {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
}

export default userReducer;
