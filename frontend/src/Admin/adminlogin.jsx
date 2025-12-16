import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Admin.css"


export default function AdminLogin() {
  const api = "http://localhost:5000";
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({ name: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function oc(e) {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      if (!admin.name || !admin.password) {
        alert("Fill all fields");
        return;
      }
      let res = await axios.post(`${api}/admin/login`, admin);
      console.log(res.data.message);
      navigate("/admindashboard");
    } catch (error) {
      if (error.response?.data) console.log(error.response.data.message);
    }
  }

  return (
  <div className="admin-login-container">
  <div className="admin-card">

    <h2 className="admin-title">Admin Panel</h2>

    <label>Admin Username</label>
    <input 
      className="admin-input"
      type="text"
      name="name"
      value={admin.name}
      onChange={oc}
      placeholder="Enter admin username"
    />

    <label>Password</label>
    <div className="password-wrapper">
      <input 
        className="admin-input"
        type={showPassword ? "text" : "password"}
        name="password"
        value={admin.password}
        onChange={oc}
        placeholder="Enter password"
      />
      <span className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "🙈" : "👁️"}
      </span>
    </div>

    <button className="admin-btn" onClick={handleSubmit}>Login</button>

  </div>
</div>

  );
}
