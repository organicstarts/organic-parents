import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const saga = createSagaMiddleware();
const logger = createLogger();

export const store = createStore(rootReducer, undefined, applyMiddleware(saga, logger));

saga.run(rootSaga);
