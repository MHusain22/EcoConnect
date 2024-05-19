import React, { useState } from 'react';
import { TextField,Box, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../Util/backend';

const Register = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });
    const navigate = useNavigate();
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        const { email, password, username } = formData;
        if (email.length > 0 && password.length > 0 && username.length > 0) {
            try {
                const response = await axios.post(`${API_URL}/register`, formData); //passing the data
                console.log("register Success", response.data);
                navigate('/login');
            } catch (error) {
                console.log("register failed", error.message);
            }
        } else {
            console.log("Invalid Credentials");
          }
        setFormData({ username: '', email: '', password: '' });
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
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
            Register
          </Button>
        </Box>
      </Box>
    </Container>
      );
}

export default Register