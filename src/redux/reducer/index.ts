import { combineReducers } from 'redux';
import { persistReducer as persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import User from "./User";

const config = {
  key: "primary",
  storage,
};

const state = combineReducers({
  User,
});

// export default state;
export default persistCombineReducers(config, state);
