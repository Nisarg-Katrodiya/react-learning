import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import classes from './style';

interface Data {
  id?: number;
  name: string;
  email: string;
  number: string;
  role: string;
  status: string;
}
interface PropTypes {
  editUserData?: Data;
  addUser: (val: Data) => void;
  close: () => void;
}

export default function UserForm({editUserData, addUser, close}: PropTypes) {

  const formik = useFormik({
    initialValues: editUserData ? editUserData : {
      name: '',
      email: '',
      number: '',
      role: '',
      status: '',
    },
    onSubmit: async values => {
      addUser(!editUserData ? values : {...values, id: editUserData.id});
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
            id="name"
            name="name"
            label="User Name"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
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
        <Grid item xs={12}>
          <TextField
            required
            id="number"
            name="number"
            type='tel'
            label="number Number"
            fullWidth
            autoComplete="Phone Number"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.number}
            sx={classes.inputStyle}
          />
          {formik.errors.number ? <div>{formik.errors.number}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="role"
            name="role"
            label="Role"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.role}
            sx={classes.inputStyle}
          />
          {formik.errors.role ? <div>{formik.errors.role}</div> : null}
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