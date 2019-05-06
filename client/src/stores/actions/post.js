import {
  CREATE_THREAD,
  GET_THREADS,
  SINGLE_THREAD,
  POST_REPLY,
  GET_REPLY,
  DELETE_THREAD,
  GET_REPLIES_COUNT,
  LOCK_THREAD,
  GET_MY_REPLY,
  VOTE_THREAD
} from "../constants";

const createNewThread = threadInfo => ({
  type: CREATE_THREAD,
  payload: threadInfo
});

const getThreads = (token, page) => ({
  type: GET_THREADS,
  payload: { token, page }
});

const setSingleThread = data => ({
  type: SINGLE_THREAD,
  payload: data
});

const postReply = replyInfo => ({
  type: POST_REPLY,
  payload: replyInfo
});

const getReplies = replyInfo => ({
  type: GET_REPLY,
  payload: replyInfo
});

const getMyReplies = token => ({
  type: GET_MY_REPLY,
  payload: token
});

const deleteThread = (threadId, token, index) => ({
  type: DELETE_THREAD,
  payload: { threadId, token, index }
});

const getRepliesCount = token => ({
  type: GET_REPLIES_COUNT,
  payload: token
});

const lockThread = (threadId, token) => ({
  type: LOCK_THREAD,
  payload: { threadId, token }
});

const voteThread = (token, threadId, vote) => ({
  type: VOTE_THREAD,
  payload: { threadId, token, vote }
});

export {
  createNewThread,
  getThreads,
  setSingleThread,
  postReply,
  getReplies,
  deleteThread,
  getRepliesCount,
  lockThread,
  getMyReplies,
  voteThread
};
