import {ReactElement, FC, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { 
  Box, 
  Paper,
  Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import LoginForm from '../components/Login/LoginForm';
import { getToken } from "../utils/common";

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const Login: FC<any> = (): ReactElement => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if(token) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    return (
      <>
        <Typography variant="h3" sx={{display: 'flex', justifyContent: 'center'}}>
          Login
        </Typography>
        <Box >
          <Item>
            <LoginForm />
          </Item>
        </Box>
      </>
    );
};

export default Login;