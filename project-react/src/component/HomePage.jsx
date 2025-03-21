import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Contact from './contact';
import Navbar from './Navbar';
import { fetchCommentForSite } from '../features/comment/commentSlice';
import { fetchFavourites } from '../features/user/favouritesSlice'; // נוסיף את הפונקציה של המומלצים
import { unwrapResult } from '@reduxjs/toolkit';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Grid, Typography, Paper, CardContent, Rating, Card, Avatar, Button } from '@mui/material'; // Import from MUI

function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [comments, setComments] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const { commentss, loading, error } = useSelector((state) => state.comment || []);
  const { favouritesList, loading: favLoading, error: favError } = useSelector((state) => state.favourites || []);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.username) {
        setUserName(parsedUser.username);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCommentForSites = async () => {
      if (comments.length == 0) {
        try {
          const actionResult = await dispatch(fetchCommentForSite());
          unwrapResult(actionResult);
          setComments(actionResult.payload);
        } catch (err) {
          console.error("Error fetching comments:", err);
        }
      }
    };
    fetchCommentForSites();
  }, [dispatch]);

  useEffect(() => {
    const fetchFavouritesList = async () => {
      try {
        if (favourites.length == 0) {
          const actionResult = await dispatch(fetchFavourites());
          unwrapResult(actionResult);
          setFavourites(actionResult.payload.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };
    fetchFavouritesList();
  }, [dispatch]);
  console.log("Favourites", favourites);
  if (loading || favLoading) return <p>Loading...</p>;
  if (error || favError) return <p>Error: {error || favError}</p>;

  const settings = {
    dots: true,
    infinite: comments.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: false,
  };

  return (
    <div>
      <Navbar />

      <Box sx={{ textAlign: 'center', margin: '40px 0' }}>
        <Typography variant="h4">Welcome to our website, a platform for promoting independent businesses</Typography>
        <Typography variant="h6" sx={{ marginTop: '10px' }}>
          Discover professionals based on your needs, and browse recommended services.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
        <Typography variant="h6">Welcome {userName} 🤩</Typography>
      </Box>

      <Box sx={{ marginBottom: '40px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Our Recommended Professionals
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: 'center', display: 'flex' }}>
          {favourites.map((fav, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ boxShadow: '0 4px 8px #1c0f42', marginTop: '3%' }}>
              <Paper sx={{ padding: '20px', textAlign: 'center', borderRadius: '10px' }}>
                <Card sx={{
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 4px 8px #1c0f42',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Avatar sx={{ bgcolor: '#B0B0B0', width: 50, height: 50, marginBottom: 2 }}>
                      <img
                        src="לרקעע/Asset-1@2x-300x226.png"
                        alt="MyBCard Logo"
                        style={{ height: '40px', marginLeft: '10px' }}
                      />
                    </Avatar>
                    <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                      {fav.professionals.theProfessional.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                      {fav.professionals.theProfessional.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                      {fav.professionals.theProfessional.description}
                    </Typography>
                  </CardContent>
                  <Button variant="outlined" sx={{ textTransform: 'none', marginTop: 'auto', color: '#1c0f42', borderColor: '#1c0f42', }} onClick={() => navigate(`/PageMan/${fav.professionals.id}`)}>
                    View Profile
                  </Button>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>


      <Box sx={{ width: '80%', maxWidth: '1000px', margin: '0 auto' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px', textAlign: 'center' }}>Customer Reviews</Typography>

        {comments.length > 0 ? (
          <Slider {...settings}>
            {comments.map((comment, index) => (
              <div key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    margin: '10px',
                    textAlign: 'left',
                    borderRadius: '10px',
                    boxShadow: 3,
                    backgroundColor: '#f9f9f9',
                  }}
                >

                  <Card sx={{ mb: 3, borderRadius: 2, border: '1px solid #ddd', backgroundColor: '#f0f0f0', boxShadow: '0 4px 8px #1c0f42' }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar sx={{ bgcolor: '#B0B0B0', width: 50, height: 50, marginRight: 2 }}>
                          {comment.userName ? (
                            <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                              {comment.userName[0]} 
                            </Typography>
                          ) : (
                            <AccountCircleIcon sx={{ fontSize: '30px', color: '#fff' }} />
                          )}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {comment.userName}
                        </Typography>
                      </Box>

                     
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                          rating:
                        </Typography>
                        <Rating value={comment.rating} readOnly precision={0.5} size="large" /> 
                      </Box>

                    
                      <Typography variant="body2" mt={2}>
                        {comment.comment}
                      </Typography>
                    
                      <Typography variant="body2" color="textSecondary" mt={1}>
                        {comment.date}
                      </Typography>
                    </CardContent>
                  </Card>

                </Paper>
              </div>
            ))}
          </Slider>
        ) : (
          <Typography sx={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
            There are no comments.
          </Typography>
        )}
      </Box>



      <Contact />
    </div>
  );
}

export default HomePage;
