import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authorizationhandler";
import { showPopup } from "../redux/Popup";

const Login = ({ goBackHome }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        username: form.username,
        password: form.password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      dispatch(
        showPopup({
          message: "Login Successful!",
          type: "success",
        })
      );
    }

    if (loginUser.rejected.match(result)) {
      dispatch(
        showPopup({
          message: result.payload || "Login failed",
          type: "error",
        })
      );
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>E-COM</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="signup-btn">
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="back-link" onClick={goBackHome}>
            Don't have account? Sign Up
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

