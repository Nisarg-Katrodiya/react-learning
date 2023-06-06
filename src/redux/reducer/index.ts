import { combineReducers } from 'redux';
// import { persistReducer as persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { User } from "./User";
import { Book } from "./Book";
import { AssignBook } from "./AssignBook";

// const config = {
//   key: "primary",
//   storage,
// };

const state = combineReducers({
  User,
  Book,
  AssignBook
});

export default state;
// export default persistCombineReducers(config, state);
