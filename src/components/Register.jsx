import React, { useState } from 'react'

function Register({setUser, setPage, users, setUsers}) {

  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(formData));
    if (Object.keys(validate(formData)).length === 0) {
      const newUser = { email: formData.email, password: formData.password, history: [] };
      setUsers((prev) => [...prev, newUser]);
      setUser({ email: formData.email });
      setPage("home");
    }
  }

  function validate({ email, password, confirmPassword }) {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    } else if (users.some((u) => u.email === email)) {
      errors.email = "This email is already registered.";
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
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  }
  return (
    <div className="page-container">
      <div className="content-card">
        <h2>📝 Create Account</h2>
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
          {errors.email && <p className="error">{errors.email}</p>}
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
          
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          
          <button>✓ Sign Up</button>
        </form>
        <p className="link-text">
          Already have an account? <a href="#" onClick={() => setPage("login")}>Login here</a>
        </p>
      </div>
    </div>
  )
}

export default Register