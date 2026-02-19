import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authorizationhandler";
import { showPopup } from "../redux/Popup";

const Signup = ({ goBackHome }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      dispatch(
        showPopup({
          message: "Passwords do not match",
          type: "error",
        })
      );
      return; 
    }

    const result = await dispatch(
      signupUser({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        joinAsSeller: true,
      })
    );

    if (signupUser.fulfilled.match(result)) {
      dispatch(
        showPopup({
          message: "Signup Successful!",
          type: "success",
        })
      );

      goBackHome();
    }

    if (signupUser.rejected.match(result)) {
      dispatch(
        showPopup({
          message: result.payload || "Signup failed",
          type: "error",
        })
      );
    }
  };

 

  useEffect(() => {
    if (error) {
      dispatch(
        showPopup({
          message:
            typeof error === "string"
              ? error
              : error?.message || "Signup failed",
          type: "error",
        })
      );
    }
  }, [error, dispatch]);


  return (
    <div className="container">
      <div className="card">
        <h1>E-COM</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
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

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="back-link" onClick={goBackHome}>
            Already have account? Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

