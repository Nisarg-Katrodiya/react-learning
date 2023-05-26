import {useState} from 'react';
import {Button, Stack, Box, Modal, Typography, AppBar} from '@mui/material';
import BookTable from './Books';
import BookForm from './bookForm';
import styles from './style';

interface BookData {
  id?: number;
  image?: any;
  name: string;
  author: string;
  quantity: number;
  price: number;
  isbn: string;
}
const rows: BookData[] = [
  {id: 1, name: 'test user', author: 'author X', quantity: 20, price: 200, isbn: '0998973815'},
  {id: 2, name: 'donut drum', author: 'author Y', quantity: 11, price: 310, isbn: '0998S73915'},
];

function Book() {
  const [bookList, setBookList] = useState<BookData[]>(rows);
  const [bookEdit, setEditBook] = useState<BookData>();
  const [open, setOpen] = useState(false);
  const handleModel = () => setOpen((prev => !prev));
  const handleAddBook = (val: BookData) => {
    if(val.id){
      const index = bookList.findIndex(data => data.id === val.id);
      bookList.splice(index, 1, val);
      setBookList(bookList);
    } else {
      const newBook = [...bookList, {...val, id: bookList.length + 1}]
      setBookList(newBook);
    }
    setEditBook(undefined);
  }
  const handleDeleteBook = (val: number) => 
    setBookList((prev: BookData[]) => prev.filter((data: BookData) => data.id !== val));
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