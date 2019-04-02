import { takeEvery } from "redux-saga/effects";
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_LOGOUT } from "../constants";
import { handleLogin, handleSignUp, handleLogout } from "./auth";

export default function* watcherSaga() {
  yield takeEvery(AUTH_LOGIN, handleLogin);
  yield takeEvery(AUTH_SIGNUP, handleSignUp);
  yield takeEvery(AUTH_LOGOUT, handleLogout);
}
