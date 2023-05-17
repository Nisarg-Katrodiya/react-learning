import {Container} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Navbar from "../../Navigation/Navbar";

const useStyles = makeStyles((theme: any) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '70vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

const MainLayout = ({children}: any)  => {
  const classes = useStyles();
	return (
		<>
      <Navbar />
			<main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
		</>
	);
};

export default MainLayout;