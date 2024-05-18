import React, { useState } from 'react'
import { Dialog } from '@mui/material'
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const AddInitiative = ({open,setOpen}) => {
    const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '' });
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = async(e) => {
        const {name,description,imageUrl} = formData;
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/addinitiative", formData); //passing the data
            console.log("initative added", response.data);
            handleClose();
          } catch (error) {
       
            console.log("initiative failed");
          }
        setFormData({ name: '', description: '', imageUrl: '' });
      };

  return (
    <Dialog open={open} onClose={handleClose}>
        <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Add Initiative
      </Typography>
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
            <TextField
              label="Image URL"
              variant="outlined"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" onClick={handleSubmit}  variant="contained" color="primary">
              Add Initiative
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </Dialog>
  )
}

export default AddInitiative