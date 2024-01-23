import React, { useState } from "react";
import "./Login.css";
import Swal from "sweetalert2"; // to give alert
import axios from "axios";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";



const Login = () => {
  const navigate = useNavigate("/root");
  const [token, setToken] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // ... operator is an spread syntax
    console.log(formData, [e.target.name], e.target.value);
  };

  const validateEmail = (email) => {
    // A basic email validation pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    // the test function will give a true or falsse value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Please enter a valid email " });
      return;
    }
    setErrors({ email: "" });

    console.log("Form submitted", formData);

    axios
      .post("http://localhost:4000/login", formData)
      .then((response) => {
        // console.log("data", response.data.token);
        
        // console.log("token", token);
        console.log(response.status);
        if (response.status == 200) {
          const token=response.data.token;
          // console.log("ere we are", response.data);
          console.log("token", token);
          Cookies.set('token', token);

          setToken(token);

          navigate("../UserProfile");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response) {
            console.log(error.response);
          }
          console.log(error.response.status);
          if (error.response.status == 401) {
            Swal.fire({
              title: "Wrong username or password",
              // text: 'The provided username is already in use. Please choose a different one.',
              icon: "error",
              confirmButtonText: "Okay",
            });
          }
        }
      });
    // login logic here
  };

  return (
    <div className="sign-div">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span className="error">{errors.email}</span>
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      <div>
        Don't have an account? <a href="/">Sign up here</a>
      </div>
    </div>
  );
};

export default Login;
