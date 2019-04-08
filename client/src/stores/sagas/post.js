import { CREATE_THREAD_LOADED } from "../constants";
import { call, put } from "redux-saga/effects";
import axios from "axios";

function* handleCreateThread(action) {
  try {
    const payload = yield call(createThread, action);
    yield put({ type: CREATE_THREAD_LOADED, payload });
    document.location.href = "/";
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

const createThread = async action => {
  const { subject, content, token } = action.payload;
  return await axios.post(
    "/thread",
    { subject, content },
    {
      headers: {
        Authorization: token
      }
    }
  );
};

export { handleCreateThread };
