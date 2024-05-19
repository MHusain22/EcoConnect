import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
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
        console.log(email)
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
        
        // console.log(formData);

        setFormData({ username: '', email: '', password: '' });
      };
    
      return (
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form method='post' onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
            <Button type="submit"  variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
        </Container>
      );
}

export default Register