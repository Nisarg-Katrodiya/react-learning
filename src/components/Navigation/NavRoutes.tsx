import PropTypes from 'prop-types';
import {Routes, Route } from "react-router-dom";

import MainLayout from '../Layouts/Main/Main';
import {getDataFromSession} from '../../utils/localstorage';

NavSection.propTypes = {
  routes: PropTypes.array
};

type propsType = {
  routes: any[]
}

export default function NavSection({ routes }: propsType) {
  const userData = getDataFromSession('currentUser');
  return (
    <Routes>
      {routes
        .filter((route)=> userData?.role === 'student' ? route?.key != 'user-route' : route)
        .map((route) => {
        return (
          <Route
            key={route.key}
            path={route.path}
            element={
              <MainLayout key={route.key}>
                <route.component/>
              </MainLayout>
            }
          />
      )})}
    </Routes>
  );
}