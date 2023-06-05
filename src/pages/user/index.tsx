import {useState, useEffect} from 'react';
import {Button, Stack, Box, Modal, Typography, AppBar} from '@mui/material';
import UserTable from './Users';
import UserForm from './userForm';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {TypedDispatch} from '../../redux/store/store';
import { GetUsers, CreateUser, EditUser, EditBulkUser, RemoveUser } from '../../redux/action/user';
import {IUser} from '../../interface/user.interface';

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

  const [userEdit, setEditUser] = useState<IUser>();
  const [column, setColumn] = useState<keyof IUser>('firstName');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);
  const handleModel = () => setOpen((prev => !prev));
  const handleAddUser = async (val: IUser) => {
    if(userEdit){
      const index = users.findIndex((data: IUser) => data.id === val.id);
      const userDataList = [...users]
      userDataList.splice(index, 1, val);
      await dispatch(EditUser(val, userDataList));
    } else {
      await dispatch(CreateUser(val, users));
    }
    setEditUser(undefined);
  }
  const handleDeleteUser = async (val: IUser) => {
    await dispatch(RemoveUser(val));
    setSelected([]);
  }
  const handleEditUser = (val: IUser) => {
    setEditUser(val);
    handleModel();
  };
  const handleModelClose = () => {
    setEditUser(undefined);
    handleModel();
  };

  const handleBulkAction = async(val: string, selectedUsers: readonly string[]) => {
    await dispatch(EditBulkUser(val, selectedUsers, users));
    setSelected([]);
  };
  const handleSearch = async(val: string) => {
    await dispatch(GetUsers(val, column));
  };
  const handleSearchColumn = (val: keyof IUser) => {
    setColumn(val)
  };

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{my: 2}}>
        <Typography
          variant="h4"
          id="tableTitle"
        >
          Users
        </Typography>
        <Button variant="contained" onClick={handleModel}>Create User</Button>
      </Stack>
      <UserTable 
        userList={users}
        setUpdateData={(val: IUser) => handleEditUser(val)}
        handleDeleteUser={(user: IUser) => handleDeleteUser(user)}
        handleBulkAction={(val: string, Ids: readonly string[]) => handleBulkAction(val, Ids)}
        handleSearch={(val: string) => handleSearch(val)}
        handleSearchColumn={(val: keyof IUser) => handleSearchColumn(val)}
        selected={selected}
        setSelected={setSelected}
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