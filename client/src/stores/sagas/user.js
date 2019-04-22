import { call, put } from "redux-saga/effects";
import axios from "axios";
import {
  UPLOAD_AVATAR_LOADED,
  GET_USERS_COUNT_LOADED,
  GET_USER_LOADED,
  BAN_USER_LOADED,
  CHANGE_ROLE_LOADED,
  UPDATE_USER_LOADED,
  GET_BANNED_USERS_LOADED
} from "../constants";

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

function* handleUsersCount(action) {
  try {
    const payload = yield call(getUsersCount, action.payload);
    yield put({ type: GET_USERS_COUNT_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}
function* handleGetUser(action) {
  try {
    const payload = yield call(getUser, action.payload);
    yield put({ type: GET_USER_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handleBanUser(action) {
  try {
    const payload = yield call(banUser, action.payload);
    yield put({ type: BAN_USER_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handleGetBannedUser(action) {
  try {
    const payload = yield call(getBannedUsers, action.payload);
    yield put({ type: GET_BANNED_USERS_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handleChangeRole(action) {
  try {
    const payload = yield call(changeRole, action.payload);
    yield put({ type: CHANGE_ROLE_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}
function* handleUpdateUser(action) {
  try {
    const payload = yield call(updateUser, action.payload);
    yield put({ type: UPDATE_USER_LOADED, payload });
    window.location.reload(true);
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

const getUsersCount = async action => {
  const token = action.payload;
  return await axios.get("/user/all", {
    headers: {
      Authorization: token
    }
  });
};

const getBannedUsers = async action => {
  const token = action;
  return await axios.get("/users/all/banned", {
    headers: {
      Authorization: token
    }
  });
};

const updateUser = async action => {
  const { token, updateInfo } = action;
  return await axios
    .patch("/users/me", updateInfo, {
      headers: {
        Authorization: token
      }
    })
    .then(response => response.data);
};

const getUser = async action => {
  const { userId, token } = action;

  return await axios.get(`/users/${userId}`, {
    headers: {
      Authorization: token
    }
  });
};

const banUser = async action => {
  const { userId, token } = action;

  return await axios.patch(
    `/users/ban`,
    { id: userId },
    {
      headers: {
        Authorization: token
      }
    }
  );
};

const changeRole = async action => {
  const { userId, token } = action;

  return await axios.patch(
    `/users/role`,
    { id: userId },
    {
      headers: {
        Authorization: token
      }
    }
  );
};

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

export {
  handleUpload,
  handleDeleteUser,
  handleUsersCount,
  handleGetUser,
  handleBanUser,
  handleChangeRole,
  handleUpdateUser,
  handleGetBannedUser
};
