import { Link } from "react-router-dom";
import { useState } from "react";



import toast from "react-hot-toast";
import axios from "axios";
import "./signUp.css"; // Import CSS file

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  
    fullname: "",
    password: "",
  });


  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:10000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      toast.success("Account Created Successfully");
      window.location.reload();
      setFormData({
        email: "",
        
        fullname: "",
        password: "",
      });

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } 
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
     
      <div className="right-section">
        <form className="signup-form" onSubmit={handleSubmit}>
         
          <h1 className="title">Join today.</h1>

          <label className="input-field">
           
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </label>

          <div className="input-group">
            
            <label className="input-field">
              
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={handleInputChange}
                value={formData.fullname}
                required
              />
            </label>
          </div>

          <label className="input-field">
           
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
          </label>

          <button className="signup-button" >
            "Sign up"
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>

        <div className="signin-section">
          <p className="signin-text">Already have an account?</p>
          <Link to="/login">
            <button className="signin-button">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
