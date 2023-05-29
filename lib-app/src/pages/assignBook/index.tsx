import {useState} from 'react';
import {Button, Stack, Box, Modal, Typography, AppBar} from '@mui/material';
import AssignedAssignTable from './assignList';
import AssignForm from './assignForm';
import styles from './style';

interface AssignData {
  id: number;
  name: string;
  author: string;
  quantity: number;
  userName: string;
  assignDate: string;
  returnDate?: string;
  status?: string;
}
const rows: AssignData[] = [
  {id: 1, name: 'test user', author: 'author X', quantity: 2, userName: 'User1', assignDate: '0998973815', returnDate: '826726745678', status: 'assigned'},
  {id: 2, name: 'donut drum', author: 'author Y', quantity: 1 , userName: 'user2', assignDate: '0998973815', returnDate: '826726745678', status: 'assigned'},
];

function Assign() {
  const [assignList, setAssignList] = useState<AssignData[]>(rows);
  const [assignEdit, setEditAssign] = useState<AssignData>();
  const [open, setOpen] = useState(false);
  const handleModel = () => setOpen((prev => !prev));
  const handleAssignBook = (val: AssignData) => {
    if(val.id){
      const index = assignList.findIndex(data => data.id === val.id);
      assignList.splice(index, 1, val);
      setAssignList(assignList);
    } else {
      const newAssign = [...assignList, {...val, id: assignList.length + 1}]
      setAssignList(newAssign);
    }
    setEditAssign(undefined);
  }
  const handleReturnAssign = (val: number) => 
    setAssignList((prev: AssignData[]) => prev.filter((data: AssignData) => data.id !== val));
  const handleEditAssign = (val: AssignData) => {
    setEditAssign(val);
    handleModel();
  };
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{my: 2}}>
        <Button variant="contained" onClick={handleModel}>Create Assign</Button>
      </Stack>
      <AssignedAssignTable 
        assignList={assignList}
        setUpdateData={(val: AssignData) => handleEditAssign(val)}
        handleDeleteAssign={(id: number) => handleReturnAssign(id)}
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