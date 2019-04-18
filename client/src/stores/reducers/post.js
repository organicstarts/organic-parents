import {
  GET_THREADS_LOADED,
  SINGLE_THREAD,
  GET_REPLY_LOADED,
  DELETE_THREAD_LOADED,
  DELETE_THREAD,
  GET_REPLIES_COUNT_LOADED,
  LOCK_THREAD_LOADED,
  GET_MY_REPLY_LOADED
} from "../constants";
import categories from "../../config-client/categories.json";
import moment from "moment";

const INITIAL_STATE = {
  threads: [],
  thread: [],
  threadCount: 0,
  repliesCount: 0,
  myReplies:[]
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
    data.createdAt = moment(data.createdAt).format("LLL");
  });

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

const removeThread = (state, action) => {
  const tempThreads = [...state.threads];
  tempThreads.splice(state.deleteIndex, 1);

  return Object.assign({}, state, {
    threads: tempThreads
  });
};

const setLockThread = (state, action) => {
  const tempThreads = [...state.threads];
  tempThreads.map(thread => {
    if (thread._id === action.payload.data._id) {
      thread.lock = action.payload.data.lock;
    }
  });

  return Object.assign({}, state, {
    threads: tempThreads
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
    case DELETE_THREAD: {
      return Object.assign({}, state, {
        deleteIndex: action.payload.index
      });
    }
    case DELETE_THREAD_LOADED: {
      return removeThread(state, action);
    }
    case GET_REPLIES_COUNT_LOADED: {
      return Object.assign({}, state, {
        repliesCount: action.payload.data.replies
      });
    }
    case GET_MY_REPLY_LOADED: {
      return Object.assign({},state, {
        myReplies: action.payload.data
      })
    }
    case LOCK_THREAD_LOADED: {
      return setLockThread(state, action);
    }
    default:
      return state;
  }
}

export default postReducer;
