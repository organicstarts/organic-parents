import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import {
  createFilter,
  createBlacklistFilter
} from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const logger = createLogger();
const saga = createSagaMiddleware();

const saveSubsetBlacklistFilter = createFilter("postState", [
  "thread"
],);

const persistConfig = {
  key: "root",
  storage,
  transforms: [saveSubsetBlacklistFilter]
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(saga, logger)
);
export const persistor = persistStore(store);

saga.run(rootSaga);
