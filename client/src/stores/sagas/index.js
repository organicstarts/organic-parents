import { takeEvery } from "redux-saga/effects";
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  UPLOAD_AVATAR,
  CREATE_THREAD
} from "../constants";
import { handleLogin, handleSignUp, handleLogout } from "./auth";
import { handleUpload } from "./user";
import { handleCreateThread } from "./post";

export default function* watcherSaga() {
  yield takeEvery(AUTH_LOGIN, handleLogin);
  yield takeEvery(AUTH_SIGNUP, handleSignUp);
  yield takeEvery(AUTH_LOGOUT, handleLogout);
  yield takeEvery(UPLOAD_AVATAR, handleUpload);
  yield takeEvery(CREATE_THREAD, handleCreateThread);
}
