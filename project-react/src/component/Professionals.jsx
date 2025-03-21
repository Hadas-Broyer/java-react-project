import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfessionals } from '../features/Professional/ProfessionalSlice';
import { Box, Button, TextField, Grid, Typography, List, ListItem, Divider, Avatar, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Navbar from './Navbar';
import Contact from './contact';

export default function Professionals() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { professional, loading, error } = useSelector((state) => state.professional);
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');


  useEffect(() => {
    dispatch(fetchProfessionals());
  }, [dispatch]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const handleProfessionalClick = (id) => {
    navigate(`/professional/${id}`);
  };

  // Format data
  const data = professional.map((p) => ({
    id: p.id,
    name: p.theProfessional.name || 'Name not available',
    phone: p.theProfessional.phone || 'Phone not available',
    address: p.theProfessional.address || 'Country not available', 
   
  }));

  // Handle Search form submission
  function onSearch(event) {
    event.preventDefault();
    const searchQuery = event.target.elements['search-query'].value;
    setQuery(searchQuery);
  }

  // Filter the data by country, name, or phone
  const filteredData = data.filter((item) => {
    return (
      (item.name.toLowerCase().includes(query.toLowerCase()) || item.phone.includes(query)) &&
      (selectedCountry ? item.address === selectedCountry : true) // Filter by country if selected
    );
  });

  const sortedProfessional = filteredData.sort((x, y) => x.name.localeCompare(y.name));
  // Extract unique countries from the professionals list
  const countries = [...new Set(professional.map((p) => p.theProfessional.address).filter(Boolean))];
  return (
    <>
      <Navbar />
      <Box sx={{ padding: '20px' }}>

        {/* Search and Filter */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <form onSubmit={onSearch}>
              <TextField
                id="search-query"
                label="Search by name or phone"
                type="text"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0', 
                  },
                }}
              />
            </form>
          </Grid>

          {/* Country filter */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Filter by address</InputLabel>
              <Select
                value={selectedCountry}
                label="Filter by Country"
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <MenuItem value="" >All Countries</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Professionals List */}
        <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '10px', textAlign: 'center' }}>
          All the Professionals
        </Typography>

        <List sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
          {sortedProfessional.length > 0 ? (
            sortedProfessional.map((professional) => (
              <React.Fragment key={professional.id}>
                <ListItem
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '12px',
                    boxShadow: 2,
                    transition: '0.3s',
                    '&:hover': {
                      boxShadow: 4,
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => handleProfessionalClick(professional.id)}
                >
                  <Grid container spacing={2} alignItems="center">
                    {/* Profile Avatar showing the first letter of the name */}
                    <Grid item xs={3} textAlign="center">
                      <Avatar
                        sx={{
                          bgcolor: '#B0B0B0',
                          width: 56,
                          height: 56,
                          margin: '0 auto',
                        }}
                      >
                        <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                          {professional.name[0]} 
                        </Typography>
                      </Avatar>
                    </Grid>

                    {/* Professional Name and Phone */}
                    <Grid item xs={6}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {professional.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'gray' }}>
                        {professional.phone}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'gray', marginTop: '8px' }}>
                        {professional.placeProfessional}
                      </Typography>
                    </Grid>

                    {/* View Button */}
                    <Grid item xs={3} textAlign="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleProfessionalClick(professional.id);
                        }}
                        sx={{
                          color: '#1c0f42', 
                          borderColor: '#1c0f42', 
                          '&:hover': {
                            backgroundColor: '#1c0f42', 
                            color: 'white',
                            borderColor: '#1c0f42', 
                          },
                        }}
                      >
                        View
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography>No professionals found</Typography>
          )}
        </List>
      </Box>
      <Contact />
    </>
  );
}
