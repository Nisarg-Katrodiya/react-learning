import {useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import classes from './style';

interface BookData {
  id?: number;
  image?: any;
  name: string;
  author: string;
  quantity: number;
  price: number;
  isbn: string;
}
interface PropTypes {
  editBookData?: BookData;
  addBook: (val: BookData) => void;
  close: () => void;
}

export default function BookForm({editBookData, addBook, close}: PropTypes) {
  const [selectedImage, setSelectedImage] = useState<any>(editBookData ? editBookData.image : null);
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleImageClear = () => {
    setSelectedImage(null);
  };

  const formik = useFormik({
    initialValues: editBookData ? editBookData : {
      name: '',
      author: '',
      quantity: 0,
      price: 0,
      isbn: '',
    },
    onSubmit: async values => {
      values = {...values, image: selectedImage};
      addBook(!editBookData ? values : {...values, id: editBookData.id});
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
            label="Book Name"
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
            id="author"
            name='author'
            label="Author"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.author}
            sx={classes.inputStyle}
          />
          {formik.errors.author ? <div>{formik.errors.author}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="quantity"
            name="quantity"
            label="Quantity"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.quantity}
            sx={classes.inputStyle}
          />
          {formik.errors.quantity ? <div>{formik.errors.quantity}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.price}
            sx={classes.inputStyle}
          />
          {formik.errors.price ? <div>{formik.errors.price}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="isbn"
            name="isbn"
            label="ISBN"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.isbn}
            sx={classes.inputStyle}
          />
          {formik.errors.isbn ? <div>{formik.errors.isbn}</div> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <input
            accept="image/*"
            id="image-picker"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-picker">
            <Button variant="contained" component="span">
              Choose Image
            </Button>
          </label>
          {selectedImage && (
            <div style={{margin: '10px 0px 0px'}}>
              <img src={selectedImage} alt="Selected" height={200} />
              <Button onClick={handleImageClear}>Clear</Button>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained"
            type="submit"
            sx={classes.loginStyle}>
            {!editBookData ? "Create Book" : "Edit Book"}
          </Button>
        </Grid>
      </Grid>
      </form>
  );
}