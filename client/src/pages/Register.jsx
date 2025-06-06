// client/src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import "../css/style.css";
import { UseAuthContext } from "../context/AuthContext";

const Register = () => {
  const { setShowRegister } = UseAuthContext();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/register", {
        username,
        email,
        password,
      });
      setMessage("Registered successfully"); // Set success message
    } catch (err) {
      console.error("This is the error: ", err.response.data.msg);
      setMessage(`Failed to register, ${err.response.data.msg}`); // Set error message
    }
  };

  return (
    <div className="auth-form">
      <h2 className="pb-4 text-center text-xl font-bold">Register</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit" className="mb-2">
          Register
        </button>
        <button type="button" onClick={() => setShowRegister(false)}>
          Cancel
        </button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Register;
