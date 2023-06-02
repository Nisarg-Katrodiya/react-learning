import {useState, useEffect} from 'react';
import {Button, Stack, Box, Modal, Typography, AppBar} from '@mui/material';
import UserTable from './Users';
import UserForm from './userForm';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {TypedDispatch} from '../../redux/store/store';
import { GetUsers, createUser } from '../../redux/action/user';
import {IUser} from '../../interface/user.interface';
import {v4 as uuid} from 'uuid';

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

  const [userList, setUserList] = useState<IUser[]>(users);
  const [userEdit, setEditUser] = useState<IUser>();
  const [open, setOpen] = useState(false);
  const handleModel = () => setOpen((prev => !prev));
  const handleAddUser = async (val: IUser) => {
    if(val.id){
      const index = userList.findIndex(data => data.id === val.id);
      userList.splice(index, 1, val);
      setUserList(userList);
    } else {
      setUserList([...userList, {...val, id: uuid()}]);
    }
    setEditUser(undefined);
    await dispatch(createUser(val, users));
  }
  const handleDeleteUser = (val: IUser) => 
    setUserList((prev: IUser[]) => prev.filter((data: IUser) => data.id !== val.id));
  const handleEditUser = (val: IUser) => {
    setEditUser(val);
    handleModel();
  };
  const handleModelClose = () => {
    setEditUser(undefined);
    handleModel();
  };

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{my: 2}}>
        <Button variant="contained" onClick={handleModel}>Create User</Button>
      </Stack>
      <UserTable 
        userList={userList}
        setUpdateData={(val: IUser) => handleEditUser(val)}
        handleDeleteUser={(user: IUser) => handleDeleteUser(user)}
      />
      <Modal
        open={open}
        onClose={handleModelClose}
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
              addUser={(val: IUser) => handleAddUser(val)}
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