import {useState, useEffect} from 'react';
import {Button, Stack, Box, Modal, Typography, AppBar} from '@mui/material';
import UserTable from './Users';
import UserForm from './userForm';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {TypedDispatch} from '../../redux/store/store';
import { GetUsers, createUser } from '../../redux/action/user';
import {getDataFromSession} from '../../utils/localstorage';
interface Data {
  id?: number;
  name: string;
  email: string;
  number: string;
  role: string;
  status: string;
  parentUser?: number
}

function User() {

  const dispatch = useDispatch<TypedDispatch>();
  const {users} = useSelector((state: any) => state.User);

  const GetUsersList = async () => {
    await dispatch(GetUsers());
  }

  useEffect(() => {
   GetUsersList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [userList, setUserList] = useState<Data[]>([]);
  const [userEdit, setEditUser] = useState<Data>();
  const [open, setOpen] = useState(false);
  const handleModel = () => setOpen((prev => !prev));
  const handleAddUser = async (val: Data) => {
    const userData = getDataFromSession('currentUser');
    if(val.id){
      const index = userList.findIndex(data => data.id === val.id);
      userList.splice(index, 1, val);
      setUserList(userList);
    } else {
      setUserList([...userList, {...val, id: userList.length, parentUser: userData.id }]);
    }
    setEditUser(undefined);
    await dispatch(createUser({...val, id: userList.length, parentUser: userData.id }));
  }
  const handleDeleteUser = (val: number) => 
    setUserList((prev: Data[]) => prev.filter((data: Data) => data.id !== val));
  const handleEditUser = (val: Data) => {
    setEditUser(val);
    handleModel();
  };

  useEffect(() => {
    const userData = getDataFromSession('currentUser');
    if (userData?.role === 'admin') setUserList(users);
    if (userData?.role === 'professor') {
      const filterUsers = users.filter((data: Data) => data.parentUser === userData?.id && data.role === 'student');
      setUserList(filterUsers);
    }
  }, [users])

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{my: 2}}>
        <Button variant="contained" onClick={handleModel}>Create User</Button>
      </Stack>
      <UserTable 
        userList={userList}
        setUpdateData={(val: Data) => handleEditUser(val)}
        handleDeleteUser={(id: number) => handleDeleteUser(id)}
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
                Add User form
              </Typography>
            </Box>
          </AppBar>
          <Box sx={styles.modelContentStyle}>
            <UserForm 
              addUser={(val: Data) => handleAddUser(val)}
              editUserData={userEdit}
              close={() => handleModel()}
            />
          </Box>
        </Box>
      </Modal>
    </>

  )
}

export default User;