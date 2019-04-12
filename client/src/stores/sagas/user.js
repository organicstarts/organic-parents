import { call, put } from "redux-saga/effects";
import axios from "axios";
import { UPLOAD_AVATAR_LOADED } from "../constants";

function* handleUpload(action) {
  try {
    const payload = yield call(uploadAvatar, action.payload);
    yield put({ type: UPLOAD_AVATAR_LOADED, payload });
    window.location.reload(true);
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handleDeleteUser(action) {
  try {
    const payload = yield call(deleteUser, action.payload);
    yield put({ type: UPLOAD_AVATAR_LOADED, payload });
    window.location.reload(true);
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

const uploadAvatar = payload => {
  let formData = new FormData();
  formData.append("avatar", payload.avatar);
  return axios.post("/users/me/avatar", formData, {
    headers: {
      Authorization: payload.token,
      "Content-Type": "multipart/form-data"
    }
  });
};
const deleteUser = payload => {
  return axios.delete("/users/me", {
    headers: {
      Authorization: payload,
      "Content-Type": "multipart/form-data"
    }
  });
};

export { handleUpload, handleDeleteUser };
