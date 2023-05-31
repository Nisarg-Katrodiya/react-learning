import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_ERROR,
  GET_SINGLE_BOOK_REQUEST,
  GET_SINGLE_BOOK_SUCCESS,
  GET_SINGLE_BOOK_ERROR,
} from "../../constant/constant";
const initialState = {
  fetching: false,
  books: [
    {id: 1, name: 'Dummy book1', author: 'author X', quantity: 20, price: 200, isbn: '0998973815'},
    {id: 2, name: 'Dummy book2', author: 'author Y', quantity: 11, price: 310, isbn: '0998S73915'},
  ],
  book: {},
  error: {},
};

export const Book = (state = initialState, action: any) => {
  switch (action.type) {

    case ADD_BOOK_REQUEST: return { ...state, fetching: true, };
    case ADD_BOOK_SUCCESS: return { ...state, books: action.payload, fetching: false,};
    case ADD_BOOK_ERROR: return { ...state, fetching: false, error: action.payload, };
    
    case GET_SINGLE_BOOK_REQUEST: return { ...state, fetching: true, };
    case GET_SINGLE_BOOK_SUCCESS: return { ...state, book: action.payload, fetching: false,};
    case GET_SINGLE_BOOK_ERROR: return { ...state, fetching: false, error: action.payload, };

    default: return state;
  }
};
