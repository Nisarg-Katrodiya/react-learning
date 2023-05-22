import {useState} from 'react';
import {Button, Stack, Box, Modal, Typography, AppBar} from '@mui/material';
import UserTable from './Users';
import UserForm from './userForm';
import styles from './style';

interface Data {
  name: string;
  email: string;
  number: string;
  role: string;
  status: string;
}
const rows: Data[] = [
  {name: 'test user', email: 'testuser@gmail.com', number: '9876543210', role: 'admin', status: 'active'},
  {name: 'donut drum', email: 'donut.drum@mail.com', number: '654321890', role: 'student', status: 'disable'},
];

function User() {
  const [userList, setUserList] = useState<Data[]>(rows);
  const [open, setOpen] = useState(false);
  const handleModel = () => setOpen((prev => !prev));
  const handleAddUser = (val: Data) => setUserList((prev: Data[]) => [...prev, val]);
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{my: 2}}>
        <Button variant="contained" onClick={handleModel}>Create User</Button>
      </Stack>
      <UserTable userList={userList} />
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
            <UserForm addUser={(val: Data) => handleAddUser(val)} close={() => handleModel()} />
          </Box>
        </Box>
      </Modal>
    </>

  )
}

export default User;