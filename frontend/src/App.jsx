import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';
import "./App.css"

const App = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("https://moviex-ms30.onrender.com/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch authentication data");
        }

        const data = await res.json();
        setAuthUser(data);
      } catch (error) {
        console.error(error);
        setAuthUser(null);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <>
    <Router>  {/* ✅ Wrapped inside BrowserRouter */}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
      </Routes>
    </Router>
      <Toaster />
      </>
  );
};

export default App;
