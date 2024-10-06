import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";
import { AuthProvider, useAuth } from './hooks/AuthProvider';
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Article from "./pages/Article";
import Products from "./pages/Products";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth(); // Get authentication state
    console.log(isAuthenticated)
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

 
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/article" element={<PrivateRoute element={<Article />} />} />
        <Route path="/products" element={<PrivateRoute element={<Products />} />} />
        {/* Add any additional routes here */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
