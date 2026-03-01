import React, { useEffect, useState } from "react";

function Login({ user, setPage }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(formData));
    if (Object.keys(validate(formData)).length === 0) {
      setPage("test");
    }
  }


  function validate({ email, password }) {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }else if (password.length > 20) {
      errors.password = "Password must not exceed 20 characters.";
    }else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    }else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    }else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number.";
    }else if (!/[!@#$%^&*]/.test(password)) {
      errors.password = "Password must contain at least one special character.";
    }
    return errors;
  }

  return (
    <div className="page-container">
      <div className="content-card">
        <h2>🔑 Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p style={{color: '#dc2626', marginTop: '5px'}}>{errors.email}</p>}
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <p style={{color: '#dc2626', marginTop: '5px'}}>{errors.password}</p>}

          <button style={{marginTop: '20px', width: '100%'}}>🚀 Login</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '20px', color: '#6b7280'}}>
          Don't have an account? <a href="#" onClick={() => setPage("register")} style={{color: '#3b82f6', textDecoration: 'none'}}>Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
