import {
  ADD_ASSIGN_BOOK_REQUEST,
  ADD_ASSIGN_BOOK_SUCCESS,
  ADD_ASSIGN_BOOK_ERROR,
} from "../../constant/constant";

const initialState = {
  fetching: false,
  assignBooks: [
    {id: 1, name: 'Dummy book1', quantity: 2, userName: 'tike myson', assignDate: new Date().toUTCString(), returnDate: new Date().toUTCString(), status: 'assigned', book: {id: 1, name: 'test user', author: 'author X', quantity: 20, price: 200, isbn: '0998973815'}, user: {id: 4, name: 'tike myson', email: 'tikemison@gmail.com', parentUser: 2, number: '9876544210', password: 'User@1234', role: 'professor', status: 'active'}},
    {id: 2, name: 'Dummy book2', quantity: 1 , userName: 'donut drum', assignDate: new Date().toUTCString(), returnDate: new Date().toUTCString(), status: 'return', book: {id: 2, name: 'donut drum', author: 'author Y', quantity: 11, price: 310, isbn: '0998S73915'}, user: {id: 5, name: 'donut drum', email: 'donut.drum@mail.com', parentUser: 1, number: '6543218909', password: 'User@1234', role: 'student', status: 'disable'}},
  ],
  error: {},
};

export const AssignBook = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ASSIGN_BOOK_REQUEST: return { ...state, fetching: true, };
    case ADD_ASSIGN_BOOK_SUCCESS: return { ...state, assignBooks: action.payload, fetching: false,};
    case ADD_ASSIGN_BOOK_ERROR: return { ...state, fetching: false, error: action.payload, };

    default: return state;
  }
};
