import { AUTH_LOGIN, AUTH_SIGNUP } from "../constants";

const login = state => ({
  type: AUTH_LOGIN,
  payload: state
});
const signUp = state => ({
  type: AUTH_SIGNUP,
  payload: state
});

export { login, signUp };
