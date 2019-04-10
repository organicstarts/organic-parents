import {
  CREATE_THREAD_LOADED,
  GET_THREADS_LOADED,
  POST_REPLY_LOADED,
  GET_REPLY_LOADED
} from "../constants";
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
function* handleGetThread(action) {
  try {
    const payload = yield call(getThreads, action);
    yield put({ type: GET_THREADS_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handlePostReply(action) {
  try {
    const payload = yield call(postReply, action);
    yield put({ type: POST_REPLY_LOADED, payload });
    document.location.reload();
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handleGetReply(action) {
  try {
    const payload = yield call(getReplies, action);
    yield put({ type: GET_REPLY_LOADED, payload });
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

const postReply = async action => {
  const { threadId, content, token } = action.payload;
  return await axios.post(
    "/reply",
    { content, thread: threadId },
    {
      headers: {
        Authorization: token
      }
    }
  );
};

const getReplies = async action => {
  const { threadId, token } = action.payload;
  return await axios.get(`/replies/thread/${threadId}`, {
    headers: {
      Authorization: token
    }
  });
};

const getThreads = async action => {
  const token = action.payload;
  console.log(token);
  return await axios.get("/threads", {
    headers: {
      Authorization: token
    }
  });
};

export { handleCreateThread, handleGetThread, handlePostReply, handleGetReply };
