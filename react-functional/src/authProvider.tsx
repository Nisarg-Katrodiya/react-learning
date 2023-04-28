import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => ({}),
  logout: () => ({}),
});

interface Props {
  children: any
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login');
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;