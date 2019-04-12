import { UPLOAD_AVATAR, DELETE_ACCOUNT } from "../constants";

const uploadPhoto = state => ({
  type: UPLOAD_AVATAR,
  payload: state
});

const deleteAccount = token => ({
  type: DELETE_ACCOUNT,
  payload: token
})


export { uploadPhoto, deleteAccount };
