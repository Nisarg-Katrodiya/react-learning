import * as React from 'react';
import { Link } from "react-router-dom";
import {ListItemButton} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PeopleIcon from '@mui/icons-material/People';
import {getDataFromSession} from '../../utils/localstorage';

const MainListItems = () => {
  const userData = getDataFromSession('currentUser');
  return (
    <React.Fragment>
      <Link to={'/'}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      {userData?.role !== 'student' ? (
        <Link to={'/users'}>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </Link>
      ) : null}
      <Link to={'/books'}>
        <ListItemButton>
          <ListItemIcon>
            <AutoStoriesIcon />
          </ListItemIcon>
          <ListItemText primary="Books" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  )
};

export default MainListItems;
