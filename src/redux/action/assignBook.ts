import {
  ADD_ASSIGN_BOOK_REQUEST,
  ADD_ASSIGN_BOOK_SUCCESS,
  ADD_ASSIGN_BOOK_ERROR,
} from "../../constant/constant";

interface AssignData {
  id: number;
  name: string;
  author: string;
  quantity: number;
  bookQty?: number;
  user?: any;
  book?: any;
  userName: string;
  assignDate: string;
  returnDate?: string;
  status?: string;
}

const assignBookRequest = () => ({ type: ADD_ASSIGN_BOOK_REQUEST });
const assignBookSuccess = (payload: any) => ({ type: ADD_ASSIGN_BOOK_SUCCESS, payload });
const assignBookFailure = (message: string) => ({ type: ADD_ASSIGN_BOOK_ERROR, message });

export const SetAssignBooks = (data: AssignData[]) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(assignBookRequest());
    if (data) {
      dispatch(assignBookSuccess(data));
      resolve(data);
    } else {
      dispatch(assignBookFailure("Fail to Get Book"));
      reject();
    }
  });

export const GetAssignBooks = (bookId: keyof AssignData, list: AssignData[]) => (): Promise<AssignData[]> => 
  new Promise((resolve: any, reject: any) => {
    try {
      let newAssignList: AssignData[] = list.filter((item: AssignData) => item.book.id === bookId);
      resolve(newAssignList);
    } catch(error) {
      reject();
    }
  });