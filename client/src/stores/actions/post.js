import { CREATE_THREAD, GET_THREADS, SINGLE_THREAD, POST_REPLY, GET_REPLY } from "../constants";

const createNewThread = threadInfo => ({
  type: CREATE_THREAD,
  payload: threadInfo
});

const getThreads = token => ({
  type: GET_THREADS,
  payload: token
});

const setSingleThread = data =>({
  type: SINGLE_THREAD,
  payload: data
})

const postReply = replyInfo =>({
  type: POST_REPLY,
  payload: replyInfo
})

const getReplies = replyInfo =>({
  type: GET_REPLY,
  payload: replyInfo
})
export { createNewThread, getThreads, setSingleThread, postReply, getReplies };
