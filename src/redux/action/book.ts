import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_ERROR,
  GET_SINGLE_BOOK_REQUEST,
  GET_SINGLE_BOOK_SUCCESS,
  GET_SINGLE_BOOK_ERROR
} from "../../constant/constant";

interface bookDataType {
  id?: number;
  image?: any;
  name: string;
  author: string;
  quantity: number;
  price: number;
  isbn: string;
}

const setBookListRequest = () => ({ type: ADD_BOOK_REQUEST });
const setBookListSuccess = (payload: any) => ({ type: ADD_BOOK_SUCCESS, payload });
const setBookListFailure = (message: string) => ({ type: ADD_BOOK_ERROR, message });

export const SetBooks = (data: bookDataType[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(setBookListRequest());
    if (data) {
      dispatch(setBookListSuccess(data));
      resolve(data);
    } else {
      dispatch(setBookListFailure("Fail to Get Book"));
      reject();
    }
  });

const singleBookRequest = () => ({ type: GET_SINGLE_BOOK_REQUEST });
const singleBookSuccess = (payload: any) => ({ type: GET_SINGLE_BOOK_SUCCESS, payload });
const singleBookFailure = (message: string) => ({ type: GET_SINGLE_BOOK_ERROR, message });

export const setResentBook = (bookData: bookDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(singleBookRequest());
    try{
      dispatch(singleBookSuccess(bookData));
      resolve(bookData);
    } catch(error) {
      dispatch(singleBookFailure("Fail to Login Book"));
      reject();
    }
  });
