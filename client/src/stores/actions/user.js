import { UPLOAD_AVATAR, DELETE_ACCOUNT, GET_USERS_COUNT } from "../constants";

const uploadPhoto = state => ({
  type: UPLOAD_AVATAR,
  payload: state
});

const deleteAccount = token => ({
  type: DELETE_ACCOUNT,
  payload: token
});

const getUsersCount = token => ({
  type: GET_USERS_COUNT,
  payload: token
});

export { uploadPhoto, deleteAccount, getUsersCount };
