import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Drawer, Button, AppBar, Toolbar, IconButton, Avatar, Typography, Container, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from './Navbar';

const AdminArea = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {/* AppBar - Top bar */}


      {/* Main Content */}
      <Container sx={{ marginTop: 3 }}>
        <Box sx={{ textAlign: 'center', padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Admin Area
          </Typography>
          <Typography variant="body1" paragraph>
            Here you can manage categories and other settings.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate(`/AddCategory`)}
            sx={{ marginTop: 2 }}
          >
            Add Category
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate(`/CategoryForDelete`)}
            sx={{ marginTop: 2 }}
          >
            delete Category
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AdminArea;
