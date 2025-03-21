import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTheprofessionalById, fetchTheprofessionalById } from '../features/theProfessional/theProfessionalSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Navbar from './Navbar';
import { TextField, Button, Container, Grid, Typography, CircularProgress, Box } from '@mui/material';

function UpdateProfessional() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("id", id);

  // Create the state for the form data
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: '',
    phone: '',
    email: '',
    subject: '',
    years: '',
    password: '',
    description: '',
    images: [],
    placeProfessional: '',
    city: '',
  });

  console.log("formData:", formData);

  const { professional, isLoading, message, error } = useSelector(state => state.professional || {});

  useEffect(() => {
    // Fetch the professional from the server using the ID
    dispatch(fetchTheprofessionalById(id))
      .then(unwrapResult) // This unwraps the result cleanly
      .then((response) => {
        console.log("Fetched professional:", response);
        setFormData({
          name: response.name || '',
          address: response.address || '',
          price: response.price || '',
          phone: response.phone || '',
          email: response.email || '',
          subject: response.subject || '',
          years: response.years || '',
          password: response.password || '',
          description: response.description || '',
          images: [] // Images are not loaded here
          , placeProfessional: response.placeProfessional || '',
          city: response.city || '',
        });
      })
      .catch((err) => {
        console.error("Error fetching professional:", err);
      });
  }, [id, dispatch]);

  // Loads the data only when the professional exists and is not loading
  useEffect(() => {
    if (professional && !isLoading) {
      setFormData({
        name: professional.name || '',
        address: professional.address || '',
        price: professional.price || '',
        phone: professional.phone || '',
        email: professional.email || '',
        subject: professional.subject || '',
        years: professional.years || '',
        password: professional.password || '',
        description: professional.description || '',
        images: [], // Images are not loaded here
        placeProfessional: professional.placeProfessional || '',
        city: professional.city || ''
      });
    }
  }, [professional, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name || null,
      address: formData.address || null,
      price: formData.price || 0,
      phone: formData.phone || null,
      email: formData.email || null,
      subject: formData.subject || null,
      years: formData.years || null,
      password: formData.password || null,
      description: formData.description || null,
      images: formData.images.length > 0 ? formData.images : null,
      placeProfessional: formData.placeProfessional,
      city: formData.city || null
    };
    console.log("updatedData", updatedData);
    console.log("idUpdate", id);
    console.log("{ id, professionalData: updatedData }", { id, professionalData: updatedData });

    // Update the professional on the server
    dispatch(updateTheprofessionalById({ id, professionalData: updatedData }))
      .then(unwrapResult)
      .then(() => {
        alert("Successfully updated")
        navigate(`/HomePage`);
      })
      .catch((err) => {
        console.error("Error updating professional:", err);
      });
  };

  // If loading or error
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Update Professional
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0', 
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0', 
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Study Places"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="placeProfessional"
                name="placeProfessional"
                value={formData.placeProfessional}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                name="years"
                type="number"
                value={formData.years}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0', 
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
                sx={{ backgroundColor: '#1c0f42' }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Update Professional'}
              </Button>
            </Grid>
          </Grid>
          {message && (
            <Box sx={{ mt: 2, textAlign: 'center', color: 'red' }}>
              <Typography variant="body1">{message}</Typography>
            </Box>
          )}
        </form>
      </Container>
    </>
  );
}

export default UpdateProfessional;
