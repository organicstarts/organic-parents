import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_LOGOUT, FACEBOOK_LOGIN } from "../constants";

const login = state => ({
  type: AUTH_LOGIN,
  payload: state
});

const facebookLogin = () => ({
  type: FACEBOOK_LOGIN,
});
const signUp = state => ({
  type: AUTH_SIGNUP,
  payload: state
});

const logout = state => ({
  type: AUTH_LOGOUT,
  payload: state
});

export { login, signUp, logout, facebookLogin };
