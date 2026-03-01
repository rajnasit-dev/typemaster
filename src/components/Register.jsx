import React, { useState } from 'react'

function Register({setUser}) {

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
      setUser({ email: formData.email, password: formData.password });
    }
  }

  function validate({ email, password, confirmPassword }) {
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
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>
        <p>{errors.email}</p>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </label>
        <p>{errors.password}</p>
        <label htmlFor="confirm-password">
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
          />
        </label>
        <p>{errors.confirmPassword}</p>
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default Register