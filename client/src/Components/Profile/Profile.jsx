import React, { useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
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
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user._id;
    try {
      const response = await axios.put(`${API_URL}/user/${id}`, userData);
      console.log("Profile updated successfully!", response);

      // Optionally, you can redirect the user to another page or perform other actions after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div>
      {isAuthenticated ? (
        <Container maxWidth="sm" sx={{ marginBottom: "40px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8,
              boxShadow: 3,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Profile
            </Typography>
            <Avatar
              alt={user.username}
              src={`/path-to-badge-images/${user.username.replace(
                /\s+/g,
                "-"
              )}.png`}
              sx={{ width: 80, height: 80, margin: "20px auto" }}
            />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                label="Name"
                variant="outlined"
                name="username"
                value={userData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={userData.email}
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
                value={userData.password}
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
                Update
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        "Login to the account"
      )}
    </div>
  );
};

export default Profile;
