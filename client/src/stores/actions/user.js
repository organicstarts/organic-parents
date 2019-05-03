import {
  UPLOAD_AVATAR,
  DELETE_ACCOUNT,
  GET_USERS_COUNT,
  GET_USER,
  BAN_USER,
  CHANGE_ROLE,
  UPDATE_USER, 
  GET_BANNED_USERS,
  GET_ALL_USERS
} from "../constants";

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

const getBannedUsers = token => ({
  type: GET_BANNED_USERS,
  payload: token
});
const getAllUsers = token => ({
  type: GET_ALL_USERS,
  payload: token
});

const getUser = (userId, token) => ({
  type: GET_USER,
  payload: { userId, token }
});

const banUser = (userId, token) => ({
  type: BAN_USER,
  payload: { userId, token }
});

const changeRole = (userId, token) => ({
  type: CHANGE_ROLE,
  payload: { userId, token }
});

const updateUser =  (updateInfo, token) => ({
  type: UPDATE_USER,
  payload: {updateInfo, token} 
});

export {
  uploadPhoto,
  deleteAccount,
  getUsersCount,
  getUser,
  banUser,
  changeRole,
  updateUser,
  getBannedUsers,
  getAllUsers
};
