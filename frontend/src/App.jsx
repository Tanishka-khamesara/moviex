import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Home from './pages/Home';
import Cookies from "js-cookie";

const App = () => {
  const isAuthenticated = !!Cookies.get("userToken");
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
