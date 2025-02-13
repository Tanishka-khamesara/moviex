import React from 'react'
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setError(null);

    try {
      const res = await fetch("https://moviex-ms30.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Login Successfully!");
      navigate("/"); // Redirect to homepage after successful login
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } 
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
   
          <div className="login-container">
      
      <div className="right-section">
        <form className="login-form" onSubmit={handleSubmit}>
        
          <h1 className="title">{"Let's"} go.</h1>

          <label className="input-field">
            
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>

          <label className="input-field">
           
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>

          <button className="login-button">
            "Login"
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>

        <div className="signup-section">
          <p className="signup-text">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="signup-button">Sign up</button>
          </Link>
        </div>
      </div>
    </div>

   
  )
}

export default Login