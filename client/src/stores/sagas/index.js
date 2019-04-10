import { takeEvery } from "redux-saga/effects";
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  UPLOAD_AVATAR,
  CREATE_THREAD,
  GET_THREADS,
  POST_REPLY,
  GET_REPLY
} from "../constants";
import { handleLogin, handleSignUp, handleLogout } from "./auth";
import { handleUpload } from "./user";
import {
  handleCreateThread,
  handleGetThread,
  handlePostReply,
  handleGetReply
} from "./post";

export default function* watcherSaga() {
  yield takeEvery(AUTH_LOGIN, handleLogin);
  yield takeEvery(AUTH_SIGNUP, handleSignUp);
  yield takeEvery(AUTH_LOGOUT, handleLogout);
  yield takeEvery(UPLOAD_AVATAR, handleUpload);
  yield takeEvery(CREATE_THREAD, handleCreateThread);
  yield takeEvery(GET_THREADS, handleGetThread);
  yield takeEvery(POST_REPLY, handlePostReply);
  yield takeEvery(GET_REPLY, handleGetReply);
}
