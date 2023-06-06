import {useState} from 'react';
import {Button, Stack, Box, Modal, Typography, AppBar} from '@mui/material';
import AssignedAssignTable from './assignList';
import AssignForm from './assignForm';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {TypedDispatch} from '../../redux/store/store';
import { SetAssignBooks } from '../../redux/action/assignBook';
import { SetBooks } from '../../redux/action/book';

// import { useLocation } from 'react-router-dom';

interface AssignData {
  id: number;
  name: string;
  author: string;
  quantity: number;
  user?: any;
  book?: any;
  userName: string;
  assignDate: string;
  returnDate?: string;
  status?: string;
}
interface BookData {
  id?: number;
  image?: any;
  name: string;
  author: string;
  quantity: number;
  price: number;
  isbn: string;
}

function Assign() {

  const dispatch = useDispatch<TypedDispatch>();
  const {assignBooks} = useSelector((state: any) => state.AssignBook);
  const {books} = useSelector((state: any) => state.Book);

  // const {state} = useLocation();
  const [assignList, setAssignList] = useState<AssignData[]>(assignBooks);
  const [assignEdit, setEditAssign] = useState<AssignData>();
  const [open, setOpen] = useState(false);
  const handleModel = () => setOpen((prev => !prev));

  const handleAssignBook = async (val: AssignData) => {
    if(val.id){
      const index = assignList.findIndex(data => data.id === val.id);
      assignList.splice(index, 1, val);
      setAssignList(assignList);
      await dispatch(SetAssignBooks(assignList));
    } else {
      const newAssign = [...assignList, {...val, id: assignList.length + 1}]
      setAssignList(newAssign);
      await dispatch(SetAssignBooks(newAssign));
      // Update Book count
      const updatedBookList = books.map((book: BookData) => {
        if(book.id === val.book.id){
          return {...book, quantity: book.quantity - val.quantity}
        } else {
          return book;
        }
      })
      await dispatch(SetBooks(updatedBookList));
    }
    setEditAssign(undefined);
  }
  const handleReturn = async (val: AssignData) => {
    const updatedUsersList = assignList.filter((data: AssignData) => data.id !== val.id);
    setAssignList(updatedUsersList);
    await dispatch(SetAssignBooks(updatedUsersList));
    // Update Book count
    const updatedBookList = books.map((book: BookData) => {
      if(book.id === val.book.id){
        return {...book, quantity: book.quantity + val.quantity}
      } else {
        return book;
      }
    })
    await dispatch(SetBooks(updatedBookList));
  }
  const handleEditAssign = (val: AssignData) => {
    setEditAssign(val);
    handleModel();
  };
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{my: 2}}>
        <Button variant="contained" onClick={handleModel}>Assign</Button>
      </Stack>
      <AssignedAssignTable 
        assignList={assignList}
        setUpdateData={(val: AssignData) => handleEditAssign(val)}
        handleDeleteAssign={(data: AssignData) => handleReturn(data)}
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
                Add Assign form
              </Typography>
            </Box>
          </AppBar>
          <Box sx={styles.modelContentStyle}>
            <AssignForm 
              addAssign={(val: AssignData) => handleAssignBook(val)}
              editAssignData={assignEdit}
              close={() => handleModel()}
            />
          </Box>
        </Box>
      </Modal>
    </>

  )
}

export default Assign;