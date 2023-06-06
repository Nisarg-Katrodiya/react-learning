import {FC} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {getDataFromSession} from '../utils/localstorage';

const Dashboard : FC = () => {
  const userData = getDataFromSession('currentUser');
  return (
    <>
    <Card>
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <ListItemText primary="Name: " />
            </ListItemAvatar>
            <ListItemText primary={userData?.name}/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <ListItemText primary="Email: " />
            </ListItemAvatar>
            <ListItemText primary={userData?.email}/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <ListItemText primary="Phone: " />
            </ListItemAvatar>
            <ListItemText primary={userData?.number || '-'}/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <ListItemText primary="In care of: " />
            </ListItemAvatar>
            <ListItemText primary={userData?.parentUser || '-'}/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <ListItemText primary="Role: " />
            </ListItemAvatar>
            <ListItemText primary={userData?.role}/>
          </ListItem>
        </List>
      </CardContent>
    </Card>
    </>
  )
}

export default Dashboard