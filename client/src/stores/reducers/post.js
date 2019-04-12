import {
  GET_THREADS_LOADED,
  SINGLE_THREAD,
  GET_REPLY_LOADED
} from "../constants";
import categories from "../../config-client/categories.json";
import moment from "moment";

const INITIAL_STATE = {
  threads: [],
  thread: [],
  threadCount: 0
};

const getCategoryColor = category => {
  for (let i in categories) {
    if (category.categories[0] === categories[i].value) {
      return categories[i].color;
    }
  }
  return "#fff";
};

const setThread = (state, action) => {
  if (action.payload.errmsg) {
    return Object.assign({}, state, {
      error: ""
    });
  }
  action.payload.data.threads.map(data => {
    data.color = getCategoryColor(data);
    data.updatedAt = moment(data.updatedAt).format("LLL");
  });

  console.log(action);
  return Object.assign({}, state, {
    threads: action.payload.data.threads,
    threadCount: action.payload.data.count
  });
};

const setReplies = (state, action) => {
  const replies = { ...state.thread };
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
