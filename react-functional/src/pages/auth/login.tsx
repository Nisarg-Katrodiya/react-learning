import React, { useContext } from 'react';
import { AuthContext } from '../../authProvider';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default LoginPage;