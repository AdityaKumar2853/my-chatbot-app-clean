// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./auth.scss";

// // export default function Login() {
// //   const [formData, setFormData] = useState({ username: "", password: "" });
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const res = await axios.post("http://localhost:5000/login", formData);
// //       if (res.data.success) {
// //         navigate("/chat");
// //       } else {
// //         setError("Invalid username or password");
// //       }
// //     } catch (err) {
// //       setError("Something went wrong. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <form onSubmit={handleSubmit}>
// //         <h2>Login</h2>
// //         {error && <div className="auth-message">{error}</div>}

// //         <input
// //           type="text"
// //           name="username"
// //           placeholder="Username"
// //           value={formData.username}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={handleChange}
// //           required
// //         />

// //         <button type="submit">Login</button>

// //         <p>
// //           Don't have an account? <Link to="/signup">Sign up</Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./auth.scss";

// export default function Login() {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/login", formData);
//       if (res.data.success) {
//         navigate("/chat");
//       } else {
//         setError("Invalid username or password");
//       }
//     } catch {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>

//         {error && <div className="auth-message">{error}</div>}

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Login</button>

//         <p>
//           Don't have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        username,
        password
      });

      if (!response.data.success) {
        setError(response.data.message || (isLogin ? 'Invalid credentials' : 'Signup failed'));
        setLoading(false);
        return;
      }

      // Store user info
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', username);
      
      // Notify parent component
      if (onLoginSuccess) {
        onLoginSuccess({
          userId: response.data.userId,
          username
        });
      }
      
      // Navigate to chat page after successful login
      navigate('/chat');
      
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-switch">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)}>Sign Up</button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)}>Login</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;