import { call, put } from "redux-saga/effects";
import axios from "axios";
import { UPLOAD_AVATAR_LOADED } from "../constants";

function* handleUpload(action) {
  try {
    const payload = yield call(uploadAvatar, action.payload);
    yield put({ type: UPLOAD_AVATAR_LOADED, payload });
    window.location.reload(true)
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

export { handleUpload };
