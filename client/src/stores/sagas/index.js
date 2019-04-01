import { takeEvery } from "redux-saga/effects";
import { AUTH_LOGIN, AUTH_SIGNUP } from "../constants";
import { handleLogin, handleSignUp } from "./auth";

export default function* watcherSaga() {
  yield takeEvery(AUTH_LOGIN, handleLogin);
  yield takeEvery(AUTH_SIGNUP, handleSignUp);
}
