import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';

import { User } from "./User";

// const config = {
//   key: "primary",
//   storage,
//   keyPrefix: 'book-'
// };

const state = combineReducers({
  User,
});

// export default persistCombineReducers(config, state);
export default state;
