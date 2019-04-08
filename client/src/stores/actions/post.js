import { CREATE_THREAD } from "../constants";

const createNewThread = threadInfo => ({
  type: CREATE_THREAD,
  payload: threadInfo
});

export { createNewThread };
