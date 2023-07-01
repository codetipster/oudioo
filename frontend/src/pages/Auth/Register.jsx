import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        toast.success("Registration Successful!");
        navigate("/success");
      } else if (response.status === 400) {
        // Handle 400 error
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        toast.error(
          responseData.error || "An error occurred during registration."
        );
      } else {
        // Handle any other non-ok status
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        toast.error("Unexpected error during registration.");
      }
    } catch (error) {
      setUserData({
        username: "",
        email: "",
        password: "",
      });
      toast.error("An error occurred during registration.");
    }
  };

  // Register.jsx
  return (
    <div className="registration-container">
      <div className="register">
        <h2>Register</h2>
        <form onSubmit={handleSubmitt}>
          <label>
            Username
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
