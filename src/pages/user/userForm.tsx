import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import classes from './style';
import {IUser} from '../../interface/user.interface';
import {v4 as uuid} from 'uuid';

interface PropTypes {
  editUserData?: IUser;
  addUser: (val: IUser) => void;
  close: () => void;
}

export default function UserForm({editUserData, addUser, close}: PropTypes) {

  const formik = useFormik({
    initialValues: editUserData ? editUserData : {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      status: '',
    },
    onSubmit: async values => {
      addUser(!editUserData ? {...values, id: uuid()} : {...values, id: editUserData.id});
      close();
    },
    // validate: values => validate(values),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="User Name"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="User Name"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            type='email'
            name='email'
            label="Email"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.email}
            sx={classes.inputStyle}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            type='tel'
            label="Phone Number"
            fullWidth
            autoComplete="Phone Number"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.phone}
            sx={classes.inputStyle}
          />
          {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="status"
            name="status"
            label="User Status"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.status}
            sx={classes.inputStyle}
          />
          {formik.errors.status ? <div>{formik.errors.status}</div> : null}
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained"
            type="submit"
            sx={classes.loginStyle}>
            {!editUserData ? "Create User" : "Edit User"}
          </Button>
        </Grid>
      </Grid>
      </form>
  );
}