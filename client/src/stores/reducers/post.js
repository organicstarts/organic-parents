import {
  GET_THREADS_LOADED,
  SINGLE_THREAD,
  GET_REPLY_LOADED
} from "../constants";

const INITIAL_STATE = {
  threads: [],
  thread: []
};

const setThread = (state, action) => {
  if (action.payload.errmsg) {
    return Object.assign({}, state, {
      error: ""
    });
  }

  return Object.assign({}, state, {
    threads: action.payload.data
  });
};

const setReplies = (state, action) => {
  const replies = {...state.thread};
  replies.replies = action.payload.data;

  return Object.assign({}, state, {
    thread: replies
  });
};

function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_THREADS_LOADED: {
      return setThread(state, action);
    }
    case SINGLE_THREAD: {
      return Object.assign({}, state, {
        thread: action.payload
      });
    }
    case GET_REPLY_LOADED: {
      return setReplies(state, action);
    }
    default:
      return state;
  }
}

export default postReducer;
