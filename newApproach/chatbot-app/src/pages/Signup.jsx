// // src/pages/Signup.jsx
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './auth.scss';

// export default function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/signup', {
//         username,
//         password,
//       });

//       if (res.data.success) {
//         setMessage('Signup successful! Redirecting to login...');
//         setTimeout(() => navigate('/'), 1500);
//       } else {
//         setMessage(res.data.message || 'Signup failed. Try again.');
//       }
//     } catch (error) {
//       setMessage('Server error. Please try again later.');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleSignup}>
//         <h2>Sign Up</h2>
//         {message && <p className="auth-message">{message}</p>}
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//         <p>
//           Already have an account? <a href="/">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// }




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.scss";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      if (res.data.success) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <div className="auth-message">{error}</div>}
        {success && <div className="auth-message success">{success}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
