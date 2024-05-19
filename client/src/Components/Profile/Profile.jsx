import React, { useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { Container, Typography,TextField, Button, Avatar } from '@mui/material';
import axios from "axios";
import API_URL from "../Util/backend";

const Profile = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
  });

  const handleChange = (e) => {
    setUserData({ ...userData,[e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user._id;
        try {
          const response = await axios.put(`${API_URL}/${id}`, userData);
          console.log('Profile updated successfully!',response);

          // Optionally, you can redirect the user to another page or perform other actions after successful update
        } catch (error) {
          console.error('Error updating profile:', error);
        }
  };
  return (
    <div>
      {isAuthenticated ? (
        <Container maxWidth="sm">
          <p>{user._id}</p>
          <Typography variant="h4" align="center" gutterBottom>
            Profile
          </Typography>
          <Avatar
            alt={user.username}
            src={`/path-to-badge-images/${user.username
              .replace(/\s+/g, "-")
              .toLowerCase()}.png`}
            style={{ width: 60, height: 60, margin: "20px auto" }}
          />
          <form method="post" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              name="username"
              value={userData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </form>
        </Container>
      ) : (
        "Login to the account"
      )}
    </div>
  );
};

export default Profile;
