import React, { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/privateRoutes';
import { AuthContext } from './authProvider';
import LoginPage from './pages/auth/login';
import RadioButtons from './pages/colorBox';
import Search from './pages/search';

const App: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/radio-buttons">Radio Buttons</Link>
          </li>
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/login" element={<LoginPage />} />
        {/* <PrivateRoute
          path="/search"
          element={<Search />}
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
        />
        <PrivateRoute
          path="/radio-buttons"
          element={<RadioButtons />}
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
        /> */}
      </Routes>
    </div>
  );
};

export default App;