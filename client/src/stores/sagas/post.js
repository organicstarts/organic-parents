import {
  CREATE_THREAD_LOADED,
  GET_THREADS_LOADED,
  POST_REPLY_LOADED,
  GET_REPLY_LOADED,
  DELETE_THREAD_LOADED,
  GET_REPLIES_COUNT_LOADED,
  LOCK_THREAD_LOADED,
  GET_MY_REPLY_LOADED
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

function* handleDeleteThread(action) {
  try {
    const payload = yield call(deleteThread, action);
    yield put({ type: DELETE_THREAD_LOADED, payload });
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

function* handleGetMyReplies(action) {
  try {
    const payload = yield call(getMyReplies, action);
    yield put({ type: GET_MY_REPLY_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handleGetRepliesCount(action) {
  try {
    const payload = yield call(getRepliesCount, action);
    yield put({ type: GET_REPLIES_COUNT_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* handleLockThread(action) {
  try {
    const payload = yield call(lockThread, action);
    yield put({ type: LOCK_THREAD_LOADED, payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

const createThread = async action => {
  const { subject, content, category, token } = action.payload;
  return await axios.post(
    "/thread",
    { subject, content, categories: category },
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

const getMyReplies = async action => {
  const  token  = action.payload;
  return await axios.get(`/replies`, {
    headers: {
      Authorization: token
    }
  });
};

const getThreads = async action => {
  const token = action.payload;
  return await axios
    .get("/threads", {
      headers: {
        Authorization: token
      }
    })
    .then(async datas => {
      await Promise.all(
        datas.data.threads.map(async data => {
          data.repliesCount = await getReplies({
            payload: { threadId: data._id, token }
          }).then(data => data.data.length);
        })
      );
      return datas;
    });
};

const deleteThread = async action => {
  const { threadId, token } = action.payload;
  return await axios.delete(`/thread/${threadId}`, {
    headers: {
      Authorization: token
    }
  });
};
const lockThread = async action => {
  const { threadId, token } = action.payload;
  return await axios.patch(
    `/thread/lock`,
    {
      _id: threadId
    },
    {
      headers: {
        Authorization: token
      }
    }
  );
};

const getRepliesCount = async action => {
  const token = action.payload;
  return await axios.get("/replies/all", {
    headers: {
      Authorization: token
    }
  });
};

export {
  handleCreateThread,
  handleGetThread,
  handlePostReply,
  handleGetReply,
  handleDeleteThread,
  handleGetRepliesCount,
  handleLockThread,
  handleGetMyReplies
};
