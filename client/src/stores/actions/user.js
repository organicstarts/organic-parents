import { UPLOAD_AVATAR } from "../constants";

const uploadPhoto = state => ({
  type: UPLOAD_AVATAR,
  payload: state
});


export { uploadPhoto };
