import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore } from "redux-persist";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";

import reducer from "../reducer";

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware: any) => 
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
})

const persister = persistStore(store);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;
const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export type ReduxState = ReturnType<typeof reducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export { store, persister, dispatch, useSelector, useDispatch};

export default persister;