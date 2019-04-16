import { takeEvery } from "redux-saga/effects";
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  UPLOAD_AVATAR,
  CREATE_THREAD,
  GET_THREADS,
  POST_REPLY,
  GET_REPLY,
  DELETE_ACCOUNT,
  DELETE_THREAD,
  GET_USERS_COUNT,
  GET_REPLIES_COUNT,
  LOCK_THREAD,
  GET_USER
} from "../constants";
import { handleLogin, handleSignUp, handleLogout } from "./auth";
import {
  handleUpload,
  handleDeleteUser,
  handleUsersCount,
  handleGetUser
} from "./user";
import {
  handleCreateThread,
  handleGetThread,
  handlePostReply,
  handleGetReply,
  handleDeleteThread,
  handleGetRepliesCount,
  handleLockThread
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
  yield takeEvery(DELETE_ACCOUNT, handleDeleteUser);
  yield takeEvery(DELETE_THREAD, handleDeleteThread);
  yield takeEvery(GET_USERS_COUNT, handleUsersCount);
  yield takeEvery(GET_REPLIES_COUNT, handleGetRepliesCount);
  yield takeEvery(LOCK_THREAD, handleLockThread);
  yield takeEvery(GET_USER, handleGetUser);
}
