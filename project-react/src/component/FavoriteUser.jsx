import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Contact from "./contact";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Avatar } from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavourites } from "../features/user/favouritesSlice";
import { useNavigate } from "react-router-dom"; // הוספת useNavigate

function FavouriteUser() {
  const [user1, setUser1] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate(); // הגדרת ה-navigate
  const [filteredFavourites, setFilteredFavourites] = useState([]);
  const dispatch = useDispatch();
  const allFavourites = useSelector(state => state.favourites.favourites);  // assuming 'favourites' slice holds the list

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log("parsedUser", parsedUser);
      setUser1(parsedUser);
    }

    if (favourites.length == 0) {
      dispatch(fetchFavourites());
    }
  }, [dispatch]);


  console.log("user1user1", user1);
  console.log("allFavourites", allFavourites);

  useEffect(() => {
    if (user1) {

      const userFavourites = allFavourites.filter(fav => fav.users && fav.users.password == user1.password && fav.users.username == user1.username);
      console.log("userFavourites", userFavourites);
      setFilteredFavourites(userFavourites);
      console.log("Filtered Favourites111", filteredFavourites);

    }
  }, [user1, allFavourites]);

  console.log("user1", user1);
  console.log("Filtered Favourites", filteredFavourites);

  const handleViewProfile = (professionalId) => {
    navigate(`/PageMan/${professionalId}`);
  };

  return (
    <>
      <Navbar />
      <div className="favourites-container" style={{ padding: '85px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Favourite Professionals
        </Typography>

        {filteredFavourites.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {filteredFavourites.map((fav, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345, boxShadow: '0 4px 8px #1c0f42', }}>
                  <CardContent>
                    <Avatar sx={{ bgcolor: '#B0B0B0', width: 56, height: 56, margin: '0 auto' }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6" align="center" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                      {fav.professionals.theProfessional.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                      {fav.professionals.theProfessional.phone}
                    </Typography>
                    <Button
                      variant="outlined"
                      color=" #1c0f42'"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      onClick={() => handleViewProfile(fav.professionals.id)} // פעולה בלחיצה
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            No favourites yet.
          </Typography>
        )}
      </div>
      <Contact />
    </>
  );
}

export default FavouriteUser;
