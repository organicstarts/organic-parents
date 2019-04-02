import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGIN_LOADED,
  AUTH_SIGNUP_LOADED,
  AUTH_LOGOUT_LOADED
} from "../constants";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  loading: false,
  token: "",
  error: ""
};

const setLoading = (state, action) => {
  return Object.assign({}, state, {
    loading: true
  });
};

const setUser = (state, action) => {
  if (action.payload.errmsg) {
    return Object.assign({}, state, {
      error: "Email already exist! please input another email address."
    });
  }

  let userInfo = {};
  const keys = Object.keys(action.payload.user);
  keys.forEach(key => (userInfo[key] = action.payload.user[key]));
  userInfo.loading = false;
  userInfo.token = action.payload.token;
  return Object.assign({}, state, userInfo);
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGIN: {
      return setLoading(state, action);
    }
    case AUTH_SIGNUP: {
      return setLoading(state, action);
    }
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

export default authReducer;
