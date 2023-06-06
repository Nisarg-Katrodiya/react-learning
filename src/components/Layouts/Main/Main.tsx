import {Container} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

import Navbar from "../../Navigation/Navbar";
import Dashboard from "./DashboardLayout";
import {getToken} from '../../../utils/common';

const useStyles = makeStyles((theme: any) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingTop: 80,
    textAlign: 'center'
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

const MainLayout = ({children}: any)  => {
  const classes = useStyles();
  const navigate = useNavigate();
  let address = ["/login", "/register"].includes(window.location.pathname);

  const userToken = getToken();
  if(!userToken) {
    navigate('/login');
  }
	return (
		<>
      { address ? (
        <>
          <Navbar />
          <main className={classes.content}>
            {/* <div className={classes.appBarSpacer} /> */}
            <Container maxWidth="lg" className={classes.container}>
              {children}
            </Container>
          </main>
        </>
        ) : (
          <Dashboard>
            {children}
          </Dashboard>
        )
      }
		</>
	);
};

export default MainLayout;