// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonDataService from '../services/commondataservice';
import { SERVICE_ROUTE } from '../services/endpoints';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const commonDataService= new CommonDataService()

  const login = async (email, password) => {
    try {
      // const response = await axios.post('http://192.168.5.57:3000/adminLogin', { email, password });
      commonDataService
      .executeApiCall(SERVICE_ROUTE.LOGIN, {email, password})
      .then((res) => {
      if (res.data.status) {
        setIsAuthenticated(true); // Set auth state to true
        navigate("/dashboard")
      } else {
        alert('Login failed: ')
      }
    }) .catch(function (error) {
      if (error) {
       
        console.log(JSON.stringify(error.response?.data));
      }
    });

  } catch{(errer)=> {}}};

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Clear token or user info on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
