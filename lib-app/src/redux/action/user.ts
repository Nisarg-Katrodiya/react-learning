import { apiInstance } from "../../httpClient";
import { setUserSession } from "../../utils/common";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR
} from "../../utils/constant";

type userDataType = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const registerUserRequest = () => ({ type: LOGIN_USER_REQUEST });
const registerUserSuccess = (payload: any) => ({ type: LOGIN_USER_SUCCESS, payload });
const registerUserFailure = (message: string) => ({ type: LOGIN_USER_ERROR, message });

export const createUser = (params: userDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(registerUserRequest());
    apiInstance
      .post('user', params)
      .then((res) => {
    dispatch(registerUserSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
    dispatch(registerUserFailure(e?.response?.data?.message));
        reject();
      });
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
    apiInstance
      .post('auth/login', params)
      .then((res) => {
        setUserSession(res.data.data.token, res.data.data.id, res.data.data.email, res.data.data);
        dispatch(loginSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(loginFailure(e?.response?.data?.message));
        reject();
      });
  });
