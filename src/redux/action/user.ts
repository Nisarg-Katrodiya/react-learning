import { getDataFromSession } from "../../utils/localstorage";
import {IUser} from '../../interface/user.interface';
import {HasError, FetchUsers, GetAllUsers, AddUser, UpdateUser, DeleteUser, DeleteAllUsers} from '../reducer/User';

export const GetUsers = () => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    const getUserList = getDataFromSession('users') || [];
    if (getUserList) {
      dispatch(GetAllUsers(getUserList));
      resolve(getUserList);
    } else {
      dispatch(HasError("Fail to Get User"));
      reject();
    }
  });

export const createUser = (params: IUser, userList: IUser[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    const index: number = userList?.findIndex((user: IUser) => user.email === params.email);
    if (index === -1) {
      dispatch(AddUser(params));
      resolve(params);
    } else {
      dispatch(HasError("Fail to Create User"));
      reject();
    }
  });

export const editUser = (params: IUser, userList: IUser[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    const index: number = userList?.findIndex((user: IUser) => user.email === params.email);
    if (index === -1) {
      userList.splice(index, 1, params);
      dispatch(UpdateUser(userList));
      resolve(userList);
    } else {
      dispatch(HasError("Fail to Create User"));
      reject();
    }
  });

  export const editBulkUser = (params: IUser, userList: IUser[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    const index: number = userList?.findIndex((user: IUser) => user.email === params.email);
    if (index === -1) {
      dispatch(UpdateUser(userList));
      resolve(userList);
    } else {
      dispatch(HasError("Fail to Create User"));
      reject();
    }
  });

export const RemoveUser = (params: IUser) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    try {
      dispatch(DeleteUser(params));
      resolve(params);
    } catch (error) {
      dispatch(HasError("Fail to Create User"));
      reject();
    }
  });

export const RemoveAllUser = (params: IUser) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    try {
      dispatch(DeleteAllUsers());
      resolve(params);
    } catch (error) {
      dispatch(HasError("Fail to Create User"));
      reject();
    }
  });
