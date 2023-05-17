/* eslint-disable react-hooks/exhaustive-deps */

import { FC, ReactElement, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { routes } from "./NavList";
import Logo from '../Logo';
// import { CartButton } from "../Dashboard/Cart";
// import LogoutButton from "./LogoutButton";
import { getToken, getUser } from "../../utils/common";

const Navbar: FC = (): ReactElement => {
  let token = getToken();
  // eslint-disable-next-line no-unused-vars
  const [navRoutes, setRoutes] = useState(routes);

  useEffect(() => {
    filterRoute()
  }, []);

  const filterRoute = () => {
    let user = getUser();
    if(!token) {
      let filteredRoute = navRoutes.filter(data => data.type.includes('auth'));
      setRoutes(filteredRoute);
    } else {
      let filteredRoute = navRoutes.filter(data => data.type.includes(user.role === 'admin' ? 'admin' : 'user')).filter(x => x.path !== window.location.pathname);
      setRoutes(filteredRoute);
    }
  }

  return (
    <AppBar component="nav">
      <Toolbar>
        <Logo />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Lib App
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, px: 5 }}>
          {navRoutes.map((page) => (
            <Link
              key={page.key}
              component={NavLink}
              to={page.path}
              color="black"
              underline="none"
              variant="button"
              sx={{px: 1}}
            >
              {page.title}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
