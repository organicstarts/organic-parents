import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGIN_LOADED,
  AUTH_SIGNUP_LOADED,
  AUTH_LOGOUT_LOADED
} from "../constants";

const INITIAL_STATE = {
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
  if (action.payload.msg === "Banned") {
    return Object.assign({}, state, {
      error: "***Your account is currently Banned!***"
    });
  }
  if (action.payload.errmsg) {
    return Object.assign({}, state, {
      error: "Email already exist! please input another email address."
    });
  }

  return Object.assign({}, state, {
    token: action.payload.token,
    loading: false,
    error: ""
  });
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
