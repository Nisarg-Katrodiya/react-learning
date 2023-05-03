import React, { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AuthContext } from './authProvider';
import LoginPage from './pages/auth/login';
import RadioButtons from './pages/colorBox';
import Form from './pages/react-form';
import Search from './pages/search';
import UserList from './pages/userList';

const App: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated && (
        <nav style={{ backgroundColor: '#333', padding: '0.8rem', width: '100%' }}>
          <ul style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none' }}>
              <>
                <li style={{ marginRight: '1rem' }}>
                  <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>
                    Search
                  </Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                  <Link to="/radio-buttons" style={{ color: 'white', textDecoration: 'none' }}>
                    Radio Buttons
                  </Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                  <Link to="/user-list" style={{ color: 'white', textDecoration: 'none' }}>
                    User List
                  </Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                  <Link to="/hook-form" style={{ color: 'white', textDecoration: 'none' }}>
                    Hook form
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '0.5rem' }}>
                    Log Out
                  </button>
                </li>
              </>
          </ul>
        </nav>
      )}
      <Routes>
        { isAuthenticated ? (
          <>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/search" element={<Search />} />
            <Route path="/radio-buttons" element={<RadioButtons />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/hook-form" element={<Form />} />
          </>
        ) : <Route path="/login" element={<LoginPage />} />}
      </Routes>
    </div>
  );
};

export default App;