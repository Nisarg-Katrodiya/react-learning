import { getDataFromSession, setDataToSession } from "../../utils/localstorage";
import {IUser} from '../../interface/user.interface';
import {HasError, FetchUsers, GetAllUsers, AddUser, UpdateUser, DeleteUser, DeleteAllUsers} from '../reducer/User';

export const GetUsers = (key?: string, column?: keyof IUser) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    let getUserList: IUser[] = getDataFromSession('users');
    if(key && column) {
      getUserList = getUserList.filter((user: IUser) => 
        user[column].toLowerCase() === key.toLowerCase()
      );
    }
    if (getUserList) {
      dispatch(GetAllUsers(getUserList));
      resolve(getUserList);
    } else {
      dispatch(HasError("Fail to Get User"));
      reject();
    }
  });

export const CreateUser = (params: IUser, userList: IUser[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    const index: number = userList?.findIndex((user: IUser) => user.id === params.id);
    if (index === -1) {
      dispatch(AddUser(params));
      setDataToSession('users', JSON.stringify([...userList, params]));
      resolve(params);
    } else {
      dispatch(HasError("Fail to Create User"));
      reject();
    }
  });

export const EditUser = (params: IUser, userList: IUser[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    const index: number = userList?.findIndex((user: IUser) => user.email === params.email);
    if (index !== -1) {
      userList.splice(index, 1, params);
      dispatch(UpdateUser(userList));
      resolve(userList);
    } else {
      dispatch(HasError("Fail to Update User"));
      reject();
    }
  });

  export const EditBulkUser = (key: string, ids: readonly string[], userList: IUser[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(FetchUsers());
    try {
      const UpdatedUserList = [...userList];
      ids.map((id: string) => {
        const index = userList.findIndex((user: IUser) => user?.id === id)
        UpdatedUserList.splice(index, 1, {...userList[index], status: key})
      })
      dispatch(UpdateUser(UpdatedUserList));
      resolve(UpdatedUserList);
    } catch(error) {
      dispatch(HasError("Failed to bulk update users"));
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
