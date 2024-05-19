// ResourceSharing.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import Head from "../UI/Head";
import SubHeading from "../UI/SubHeading";
import But from "../UI/But";

const initialResources = [
  {
    id: 1,
    title: "Sustainable Living Tips",
    description: "Learn how to live sustainably with these easy tips.",
    type: "Article",
    url: "https://www.cbs.de/en/blog/sustainable-living-tips-for-a-more-sustainable-lifestyle/",
  },
  {
    id: 2,
    title: "Recycling 101",
    description: "A video guide on how to recycle correctly.",
    type: "Video",
    url: "https://www.youtube.com/watch?v=6jQ7y_qQYUA",
  },
  
];

const Resources = () => {
  const [resources, setResources] = useState(initialResources);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "",
    url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleAddResource = () => {
    setResources([...resources, { ...newResource, id: resources.length + 1 }]);
    setNewResource({ title: "", description: "", type: "", url: "" });
  };

  return (
    <Container>
      <Head>Resource Sharing and Education</Head>

      <SubHeading>
        Explore and share resources on sustainable living.
      </SubHeading>

      <Grid container spacing={4}>
        {resources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {resource.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  style={{ marginTop: 10 }}
                >
                  Type: {resource.type}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  sx={{
                    background: "var(--var-color)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "var(--var-hover)",
                    },
                  }}
                  color="primary"
                  href={resource.url}
                  target="_blank"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: 40 }}>
        Share a Resource
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Title"
          name="title"
          value={newResource.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={newResource.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type (Article, Video, etc.)"
          name="type"
          value={newResource.type}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL"
          name="url"
          value={newResource.url}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddResource}
          sx={{
            background: "var(--var-color)",
            color: "white",
            "&:hover": {
              backgroundColor: "var(--var-hover)",
            },
            margin:"20px 0"
          }}
        >
          Add Resource
        </Button>
      </Box>
    </Container>
  );
};

export default Resources;
