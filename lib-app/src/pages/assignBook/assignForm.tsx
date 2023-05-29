import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import classes from './style';
import {useSelector} from 'react-redux';

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
interface PropTypes {
  editAssignData?: AssignData;
  addAssign: any;
  close: () => void;
}

export default function AssignForm({editAssignData, addAssign, close}: PropTypes) {

  const {users} = useSelector((state: any) => state.User);

  const formik = useFormik({
    initialValues: editAssignData ? editAssignData : {
      name: '',
      author: '',
      quantity: 0,
      userName: "",
      assignDate: "",
      returnDate: "",
      status: "",
    },
    onSubmit: async values => {
      addAssign(!editAssignData ? values : {...values, id: editAssignData.id});
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
            renderInput={(params) => <TextField {...params} label="Movie" />}
            onChange={formik.handleChange}
            value={formik.values.name}
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </Grid>
        
        <Grid item xs={12}>
          <Button 
            variant="contained"
            type="submit"
            sx={classes.loginStyle}>
            {!editAssignData ? "Create Assign" : "Edit Assign"}
          </Button>
        </Grid>
      </Grid>
      </form>
  );
}