import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
  isAuthenticated: boolean;
  redirectPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, redirectPath, ...rest }) => {
  console.log("🚀 ~ file: privateRoutes.tsx:11 ~ redirectPath:", redirectPath)
  console.log("🚀 ~ file: privateRoutes.tsx:11 ~ isAuthenticated:", isAuthenticated)
  // if (!isAuthenticated) {
  //   return <Navigate to={redirectPath} />;
  // }

  return <Route {...rest} />;
};

export default PrivateRoute;