import React, { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AuthContext } from './authProvider';
import LoginPage from './pages/auth/login';
import RadioButtons from './pages/colorBox';
import Form from './pages/react-form';
import Search from './pages/search';
import UserList from './pages/userList';
import Prime from './pages/prime';

import NavLink from './components/navLink';
import hocLink from './components/hocLink';
interface LinkDataTypes {
  title: string;
  path: string;
}

const NavigationLinks = hocLink(NavLink)
const navigationArray: LinkDataTypes[] = [{
    path: '/search',
    title: "Search"
  }, {
    path: '/radio-buttons',
    title: "Radio Buttons"
  }, {
    path: '/user-list',
    title: "User List"
  }, {
    path: '/hook-form',
    title: "hook-form"
  }, {
    path: '/prime',
    title: "Prime"
  }, {
    path: 'logout',
    title: "Log Out"
  }
]

const App: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated && (
        <nav style={{ backgroundColor: '#333', padding: '0.8rem', width: '100vw' }}>
          <ul style={{ display: 'flex', justifyContent: 'space-between', listStyleType: 'none' }}>
          {navigationArray.map((navigation, index) => (
            <NavigationLinks
              key={index.toString()}
              path={navigation.path}
              title={navigation.title}
            />
          ))}
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
            <Route path="/prime" element={<Prime />} />
          </>
        ) : <Route path="/login" element={<LoginPage />} />}
      </Routes>
    </div>
  );
};

export default App;