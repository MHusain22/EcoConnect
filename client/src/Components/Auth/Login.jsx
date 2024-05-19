import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import API_URL from "../Util/backend";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, setUserHandler } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email.length > 0 && password.length > 0) {
      // alert("correct");
      try {
        const response = await axios.post(
          `${API_URL}/login`,
          formData
        ); //passing the data
        console.log("login Success", response.data);
        console.log(response.data.user);
        setUserHandler(response.data.user);
        // console.log(response.token);
        login(response.token);
        navigate("/");
      } catch (error) {
        console.log("login failed", error.message);
      }
    } else {
      console.log("User does not exist");
    }
    setFormData({ email: "", password: "" });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form method="post" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
