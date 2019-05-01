import {
  GET_THREADS_LOADED,
  SINGLE_THREAD,
  GET_REPLY_LOADED,
  DELETE_THREAD_LOADED,
  DELETE_THREAD,
  GET_REPLIES_COUNT_LOADED,
  LOCK_THREAD_LOADED,
  GET_MY_REPLY_LOADED,
  VOTE_THREAD_LOADED,
  POST_REPLY_LOADED
} from "../constants";
import categories from "../../config-client/categories.json";
import moment from "moment";

const INITIAL_STATE = {
  threads: [],
  thread: [],
  threadCount: 0,
  repliesCount: 0,
  myReplies: []
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
    let now = moment();
    let minutes = now.diff(data.createdAt, "minutes");
    let hours = now.diff(data.createdAt, "hours");
    let days = now.diff(data.createdAt, "days");
    let weeks = now.diff(data.createdAt, "weeks");
    let result = "";

    if (weeks) {
      result += weeks + (weeks === 1 ? " week ago" : " weeks ago");
      days = days % 7;
    } else if (minutes < 60) {
      result += minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    } else if (hours < 24) {
      result += hours + (hours === 1 ? " hour ago" : " hours ago");
    } else if (days || weeks === 0) {
      result += days + (days === 1 ? " day ago" : " days ago");
    }

    data.createdAt = result;
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

const addThreadReply = (state, action) => {
  const currentThread = { ...state.thread };
  currentThread.replies.push(action.payload.data);
  return Object.assign({}, state, {
    thread: currentThread
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

const setVoteThread = (state, action) => {
  const tempThreads = [...state.threads];
  const singleThread = { ...state.thread };
  tempThreads.map(thread => {
    if (thread._id === action.payload.data._id) {
      thread.points = action.payload.data.points;
      thread.thumbVote = action.payload.data.thumbVote;
    }
  });
  if (singleThread._id === action.payload.data._id) {
    singleThread.points = action.payload.data.points;
    singleThread.thumbVote = action.payload.data.thumbVote;
  }
  return Object.assign({}, state, {
    threads: tempThreads,
    thread: singleThread
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
      return Object.assign({}, state, {
        myReplies: action.payload.data
      });
    }
    case POST_REPLY_LOADED: {
      return addThreadReply(state, action);
    }
    case LOCK_THREAD_LOADED: {
      return setLockThread(state, action);
    }
    case VOTE_THREAD_LOADED: {
      return setVoteThread(state, action);
    }
    case "API_ERRORED": {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
}

export default postReducer;
