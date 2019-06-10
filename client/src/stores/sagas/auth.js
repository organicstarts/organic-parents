import { call, put } from "redux-saga/effects";
import axios from "axios";
import {
  AUTH_LOGIN_LOADED,
  AUTH_SIGNUP_LOADED,
  AUTH_LOGOUT_LOADED,
  FACEBOOK_LOGIN_LOADED
} from "../constants";

function* handleLogin(action) {
  try {
    const payload = yield call(login, action.payload);
    yield put({ type: AUTH_LOGIN_LOADED, payload });
    document.location.href = "/";
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handleFacebookLogin() {
  try {
    const payload = yield call(facebookLogin);
    yield put({ type: FACEBOOK_LOGIN_LOADED, payload });
    document.location.href = "/";
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}
function* handleSignUp(action) {
  try {
    const payload = yield call(signUp, action.payload);
    yield put({ type: AUTH_SIGNUP_LOADED, payload });
    document.location.href = "/";
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}
function* handleLogout(action) {
  try {
    const payload = yield call(logout, action.payload);
    yield put({ type: AUTH_LOGOUT_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

const login = async payload => {
  const { email, password } = payload;
  return await axios
    .post("/users/login", {
      email,
      password
    })
    .then(response => response.data)
    .catch(e => console.log(e));
};

const facebookLogin = async () => {
  return await axios.get("/users/login/facebook");
};

const logout = async payload => {
  return await axios
    .post("users/logout", {}, { headers: { Authorization: payload } })
    .then(e => e.response)
    .catch(e => e);
};

const signUp = async payload => {
  const { email, password, firstName, lastName } = payload;
  return await axios
    .post("/users", {
      email,
      password,
      firstName,
      lastName
    })
    .then(response => response.data)
    .catch(e => e.response.data);
};

export { handleLogin, handleSignUp, handleLogout, handleFacebookLogin };
