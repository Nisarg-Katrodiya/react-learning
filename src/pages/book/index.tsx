import {useState} from 'react';
import {Button, Stack, Box, Modal, Typography, AppBar} from '@mui/material';
import BookTable from './Books';
import BookForm from './bookForm';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {TypedDispatch} from '../../redux/store/store';
import { SetBooks } from '../../redux/action/book';

interface BookData {
  id?: number;
  image?: any;
  name: string;
  author: string;
  quantity: number;
  price: number;
  isbn: string;
}

function Book() {

  const dispatch = useDispatch<TypedDispatch>();
  const {books} = useSelector((state: any) => state.Book);

  const [bookList, setBookList] = useState<BookData[]>(books);
  const [bookEdit, setEditBook] = useState<BookData>();
  const [open, setOpen] = useState(false);
  const handleModel = () => setOpen((prev => !prev));
  const handleAddBook = async (val: BookData) => {
    if(val.id){
      const index = bookList.findIndex(data => data.id === val.id);
      bookList.splice(index, 1, val);
      setBookList(bookList);
      await dispatch(SetBooks(bookList));
    } else {
      const newBook = [...bookList, {...val, id: books.length + 1}]
      setBookList(newBook);
      await dispatch(SetBooks(newBook));
    }
    setEditBook(undefined);
  }
  const handleDeleteBook = async (val: number) => {
    const updatedBooks = bookList.filter(data => data.id !== val);
    setBookList(updatedBooks);
    await dispatch(SetBooks(updatedBooks));
  }
  const handleEditBook = (val: BookData) => {
    setEditBook(val);
    handleModel();
  };
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{my: 2}}>
        <Button variant="contained" onClick={handleModel}>Create Book</Button>
      </Stack>
      <BookTable 
        bookList={bookList}
        setUpdateData={(val: BookData) => handleEditBook(val)}
        handleDeleteBook={(id: number) => handleDeleteBook(id)}
      />
      <Modal
        open={open}
        onClose={handleModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modelStyle}>
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: 'relative',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Box sx={styles.modelTitleStyle}>
              <Typography variant="h6" color="inherit" noWrap>
                Add Book form
              </Typography>
            </Box>
          </AppBar>
          <Box sx={styles.modelContentStyle}>
            <BookForm 
              addBook={(val: BookData) => handleAddBook(val)}
              editBookData={bookEdit}
              close={() => handleModel()}
            />
          </Box>
        </Box>
      </Modal>
    </>

  )
}

export default Book;