import React, { useState, useEffect } from "react";
import axios from "axios";
import CommunityPost from "./CommunityPost";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  TextField,
  Typography,
  Container,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import API_URL from "../Util/backend";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");

  const [posts, setposts] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set("description", description);
    data.set("file", files[0]);
    e.preventDefault();
    // console.log(files);
    console.log(data);
    const response = await axios.post(`${API_URL}/post/addpost`, data);
    setDescription("");
    setFiles("");
    console.log("got the data", response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/post/getpost`);
        setposts(response.data);
        console.log("got the posts", response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Box
          sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
        >
          <Container maxWidth="sm" sx={{ marginTop: 2 }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <div>
                  <svg
                    width="40px"
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiAvatar-fallback css-10mi8st-MuiSvgIcon-root-MuiAvatar-fallback"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="PersonIcon"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </div>
                <Typography variant="h6" sx={{ marginLeft: 2 }}>
                  Create a Post
                </Typography>
              </Box>
              <form method="post" onSubmit={handleSubmit}>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  placeholder="What do you want to talk about?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <IconButton color="primary" component="label">
                    <input
                      type="file"
                      onChange={(e) => setFiles(e.target.files)}
                      style={{ display: "none" }}
                    />
                    <CloudUploadIcon /> Upload Image
                  </IconButton>
                </Box>
                <Button
                  type="submit"
                  sx={{
                    background: "var(--var-color)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "var(--var-hover)",
                    },
                  }}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Post
                </Button>
              </form>
            </Paper>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                POSTS
              </Typography>
              <CommunityPost posts={posts} />
            </Box>
          </Container>
          <div className="col2"></div>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ margin: "20px 0" }} gutterBottom>
            Register Yourself to Join the Community
          </Typography>
          <Button
            sx={{
              background: "var(--var-color)",
              color: "white",
              "&:hover": {
                backgroundColor: "var(--var-hover)",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      )}
    </>
  );
};

export default Community;
