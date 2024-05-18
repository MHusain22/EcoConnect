import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { TextField, Typography, Container } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import "./Community.css";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import CommunityPost from "./CommunityPost";

const Community = () => {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState('');

  const [posts, setposts] = useState([]);

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set("description", description);
    data.set("file", files[0]);
    e.preventDefault();
    console.log(files);
    const response = await axios.post("http://localhost:5000/post", data);
    setDescription('');
    setFiles('');
    // console.log("got the data",response.data);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/post");
        setposts(response.data);
        console.log("got the posts", response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const { email, password } = formData;

  //     if (email.length > 0 && password.length > 0) {
  //       // alert("correct");
  //       try {
  //         const response = await axios.post(
  //           "http://localhost:5000/login",
  //           formData
  //         ); //passing the data
  //         console.log("login Success", response.data);

  //       } catch (error) {
  //         console.log("login failed", error.message);
  //       }
  //     } else {
  //       console.log("User does not exist");
  //     }
  //     setFormData({ email: "", password: "" });
  //   };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <div className="Col2">
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom>
            Create Post
          </Typography>
          <form method="post" onSubmit={handleSubmit}>
            <textarea
              rows={5}
              cols={70}
              type="description"
              placeholder="what do you want to talk about"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
            <input
              type="file"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Post
            </Button>
          </form>
        </Container>
        <CommunityPost posts={posts}/>
      </div>
      <div className="col2"></div>
    </Box>
  );
};

export default Community;
