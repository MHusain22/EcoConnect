import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import Head from "../UI/Head";
import API_URL from "../Util/backend";

const AddInitiative = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const { name, description } = formData;
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/addinitiative`,
        formData
      ); //passing the data
      console.log("initative added", response.data);
      handleClose();
    } catch (error) {
      console.log("initiative failed");
    }
    setFormData({ name: "", description: "", imageUrl: "" });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container maxWidth="md" sx={{marginTop:"10px",marginBottom:"30px"}}>
        <Head>
          Add Initiative
        </Head>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Initiative Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Initiative Description"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                sx={{background:"var(--var-color)",color:"white","&:hover": {
                  backgroundColor: "var(--var-hover)",
                }}}
              >
                Add Initiative
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Dialog>
  );
};

export default AddInitiative;
