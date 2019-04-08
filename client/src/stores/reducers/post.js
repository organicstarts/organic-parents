import { CREATE_THREAD_LOADED } from "../constants";



const INITIAL_STATE = {
    threads: []
  };


  const setThread = (state, action) => {
    if (action.payload.errmsg) {
      return Object.assign({}, state, {
        error: ""
      });
    }

    return Object.assign({}, state, {
        thread: action.payload
    });
  };


function postReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case CREATE_THREAD_LOADED: {
        return setThread(state, action);
      }
      default:
        return state;
    }
  }
  
  export default postReducer;