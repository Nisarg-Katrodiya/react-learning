// import { apiInstance } from "../../httpClient";
// import { setUserSession } from "../../utils/common";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR
} from "../../constant/constant";
import { getDataFromSession, setDataToSession } from "../../utils/localstorage";
import { setUserSession } from "../../utils/common";

type userDataType = {
  id?: number;
  name: string;
  email: string;
  number: string;
  role: string;
  status: string;
  password?: string;
  parentUser?: number;
}

const setUserRequest = () => ({ type: SET_USER_REQUEST });
const setUserSuccess = (payload: any) => ({ type: SET_USER_SUCCESS, payload });
const setUserFailure = (message: string) => ({ type: SET_USER_ERROR, message });

export const SetUsers = (data: userDataType[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(setUserRequest());
    if (data) {
      dispatch(setUserSuccess(data));
      setDataToSession('users', JSON.stringify(data))
      resolve(data);
    } else {
      dispatch(setUserFailure("Fail to Get User"));
      reject();
    }
  });

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (payload: any) => ({ type: GET_USER_SUCCESS, payload });
const getUserFailure = (message: string) => ({ type: GET_USER_ERROR, message });

export const GetUsers = () => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(getUserRequest());
    const getUserList = getDataFromSession('users') || [];
    if (getUserList) {
      dispatch(getUserSuccess(getUserList));
      resolve(getUserList);
    } else {
      dispatch(getUserFailure("Fail to Get User"));
      reject();
    }
  });

const registerUserRequest = () => ({ type: CREATE_USER_REQUEST });
const registerUserSuccess = (payload: any) => ({ type: CREATE_USER_SUCCESS, payload });
const registerUserFailure = (message: string) => ({ type: CREATE_USER_ERROR, message });

export const createUser = (params: userDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(registerUserRequest());
    const getUserList = getDataFromSession('users') || [];
    const index: number = getUserList?.findIndex((user: any) => user.email === params.email && user.password === params.password);
    if (index === -1) {
      dispatch(registerUserSuccess(params));
      getUserList.push(params);
      setDataToSession('users', JSON.stringify(getUserList))
        resolve(getUserList);
    } else {
      dispatch(registerUserFailure("Fail to Create User"));
      reject();
    }
  });

type loginDataType = {
  email: string,
  password: string,
}

const loginRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginSuccess = (payload: any) => ({ type: LOGIN_USER_SUCCESS, payload });
const loginFailure = (message: string) => ({ type: LOGIN_USER_ERROR, message });

export const loginUser = (params: loginDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(loginRequest());
    const getUserList = getDataFromSession('users');
    const index: number = getUserList.findIndex((user: any) => user.email === params.email && user.password === params.password);
    if (index > -1) {
      if(!getUserList[index].token) dispatch(loginFailure("Fail to Login User"));
      dispatch(loginSuccess(getUserList[index]));
      setUserSession("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidXNlcl9mbmFtZSI6IlVzZXIiLCJ1c2VyX2VtYWlsIjoidXNlci50ZXN0MTJAZ21haWwuY29tIn19.JVktU8rU4gH0yTmT0G_XGvPBeoPbr-DwNTd6_R0as8s", getUserList[index])
      resolve(getUserList[index]);
    } else {
      dispatch(loginFailure("Fail to Login User"));
      reject();
    }
  });
