import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
const [user,setUser] = useState(null);

//   const navigate = useNavigate();
const setUserHandler = (userdata) => {
    setUser(userdata);
}

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    // navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // navigate('/login');
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,setUserHandler,user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
