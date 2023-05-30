import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import classes from './style';
import {useDispatch, useSelector} from 'react-redux';
import { GetUsers } from '../../redux/action/user';
import {TypedDispatch} from '../../redux/store/store';
import { useLocation } from 'react-router-dom';
interface AssignData {
  id: number;
  name: string;
  author: string;
  quantity: number;
  bookQty?: number;
  user?: any;
  userName: string;
  assignDate: string;
  returnDate?: string;
  status?: string;
}
interface PropTypes {
  editAssignData?: AssignData;
  addAssign: any;
  close: () => void;
}

export default function AssignForm({editAssignData, addAssign, close}: PropTypes) {
  const {state} = useLocation();
  const dispatch = useDispatch<TypedDispatch>();
  const GetUsersList = async () => {
    await dispatch(GetUsers());
  }

  useEffect(() => {
   GetUsersList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {users} = useSelector((state: any) => state.User);

  const formik = useFormik({
    initialValues: editAssignData ? editAssignData : {
      user: '',
      userName: '',
      bookQty: ''
    },
    onSubmit: async values => {
      addAssign(!editAssignData ? { 
        name: state?.book?.name,
        author: state?.book?.author,
        quantity: values.bookQty,
        userName: values.userName,
        assignDate: new Date().toString(),
        returnDate: new Date().toString(),
        status: 'assigned',
        user: values?.user
      } : {
        id: editAssignData.id,
        ...values,
        name: state?.book?.name,
        author: state?.book?.author,
        quantity: values.bookQty,
        userName: values.userName,
        assignDate: new Date(),
        returnDate: new Date(),
        status: 'assigned',
      });
      close();
    },
    // validate: values => validate(values),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="users"
            options={users}
            sx={{ width: 300 }}
            getOptionLabel={(data: any) => data.name}
            onChange={(_event, newValue: AssignData) => {
              formik.setFieldValue('user', newValue || '');
              formik.setFieldValue('userName', newValue?.name || '');
            }}
            value={users.find((user: AssignData) => user.userName === formik.values.userName) || null}
            renderInput={(params) => 
              <TextField 
              {...params} 
              label="Select user"
              variant='standard'
              error={formik.touched.userName && formik.errors.userName !== undefined}
              helperText={formik.touched.userName && formik.errors.userName}
              />}
            />
            {formik.errors.userName ? <div>{formik.errors.userName}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bookQty"
            name="bookQty"
            label="Select book quantity"
            fullWidth
            type='number'
            variant='standard'
            inputProps={{ max: state?.book?.quantity || 10, min: 0 }}
            onChange={formik.handleChange}
            value={formik.values.bookQty}
            sx={classes.inputStyle}
            />
            {formik.errors.bookQty ? <div>{formik.errors.bookQty}</div> : null}
        </Grid>
        
        <Grid item xs={12}>
          <Button 
            variant="contained"
            type="submit"
            sx={classes.loginStyle}>
            {!editAssignData ? "Assign" : "Edit"}
          </Button>
        </Grid>
      </Grid>
      </form>
  );
}