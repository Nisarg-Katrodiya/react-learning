import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authProvider';

interface Props {
  path: string;
  title: string;
}

const NavLink: React.FC<Props> = React.memo((props) => {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <li style={{ marginRight: '1rem' }}>
      {props.path !== 'logout' ? (
        <Link to={props.path} style={{ color: 'white', textDecoration: 'none' }}>
          {props.title}
        </Link>
      ) : (
        <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '0.5rem' }}>
          {props.title}
        </button>
      )}
    </li>
  );
});

export default NavLink;
