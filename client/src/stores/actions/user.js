import { UPLOAD_AVATAR, DELETE_ACCOUNT, GET_USERS_COUNT, GET_USER } from "../constants";

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

const getUser = (userId, token) => ({
  type: GET_USER,
  payload: {userId, token}
})

export { uploadPhoto, deleteAccount, getUsersCount, getUser };
