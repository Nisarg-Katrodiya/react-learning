import { IUser } from './../../interface/user.interface';
import {IInitialState} from '../../interface/reducer.interface';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
const initialState: IInitialState = {
  fetching: false,
  users: [],
  error: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Loading 
    FetchUsers(state) {
      state.fetching = true;
    },
    // Has Error
    HasError(state, action: PayloadAction<string>) {
      state.fetching = false;
      state.error = action.payload;
    },
    // Fetch Users
    GetAllUsers(state, action: PayloadAction<IUser[]>) {
      state.fetching = false;
      state.users = action.payload;
    },
    // Add User
    AddUser(state, action: PayloadAction<IUser>) {
      state.fetching = false;
      state.users = [...state.users, action.payload];
    },
    // Update User
    UpdateUser(state, action: PayloadAction<IUser[]>) {
      state.fetching = false;
      state.users = action.payload;
    },
    // delete User
    DeleteUser(state, action: PayloadAction<IUser>) {
      state.fetching = false;
      const updatedUserList: IUser[] = state.users?.filter((user: IUser) => user.id !== action.payload.id);
      state.users = updatedUserList;
    },
    // Clear Users
    DeleteAllUsers(state) {
      state.fetching = false;
      state.users = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { HasError, FetchUsers, GetAllUsers, AddUser, UpdateUser, DeleteUser, DeleteAllUsers } = userSlice.actions

export default userSlice.reducer