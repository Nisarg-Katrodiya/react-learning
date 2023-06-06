/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";

import { IconButton } from '@mui/material';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { makeStyles } from "@mui/styles";

import { removeUserSession } from '../../utils/common';

const useStyles = makeStyles(() => ({
  navButtons: {
    color: '#F14D54',
    marginLeft: '10px',
    borderColor: "#F14D54"
  }
}));

const LogoutButton = () => {
  
  const classes = useStyles();
  const navigate = useNavigate();
  
  const handleCart = async () => {
    removeUserSession();
    navigate('/login')
  };

  return (
    <IconButton 
      className={classes.navButtons}
      onClick={handleCart}
    >
      <PowerSettingsNewOutlinedIcon />
    </IconButton>
  );
}

export default LogoutButton;



