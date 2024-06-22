import React, { useState, useContext } from "react";
import { TextField, Button,Box, Typography, Container } from "@mui/material";
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
        const response = await axios.post(`${API_URL}/user/login`, formData); //passing the data
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
    <Container maxWidth="sm" sx={{marginBottom:"50px"}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: "var(--var-color)",
              color: "white",
              "&:hover": {
                backgroundColor: "var(--var-hover)",
              },
            }}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
