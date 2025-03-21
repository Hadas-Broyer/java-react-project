import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfessionals } from '../features/Professional/ProfessionalSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { Card, CardContent, Typography, Button, Avatar, Box, IconButton } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Navbar from './Navbar';
import Contact from '../component/contact';
import '../cssPages/category.css';
import { createFavourites } from '../features/user/favouritesSlice';
import { fetchUser } from '../features/user/userSlice'
import { fetchCategoryById } from '../features/Category/CategorySlice'

const Category = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { professionals = [], loading, error } = useSelector((s) => s.professional);

  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [userId, setUserId] = useState([]);
  const [user, setUser] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [nameCtegory, SetNameCategory] = useState(null);
  // שליפת פרטי המשתמש והמועדפים מה-localStorage
  useEffect(() => {
    // שליפת פרטי המשתמש והמועדפים מה-localStorage
    const user1 = localStorage.getItem('user');
    if (user1) {
      const parsedUser = JSON.parse(user1);
      if (parsedUser) {
        setUser(parsedUser);
      }
    }
    console.log("useruseruseruseruser", user);
    // שליפת המועדפים גם מה-localStorage
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  console.log();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(fetchUser());
        const result = unwrapResult(actionResult);
        console.log("result", result);

        if (result) {
          const foundUser = result.find((userItem) =>
            user.username === userItem.username &&
            user.phone === userItem.phone &&
            user.email === userItem.email
          );
          if (foundUser) {
            console.log("Found matching user:", foundUser);
            setUserId(foundUser);
            // localStorage.setItem('userId', JSON.stringify(foundUser));
          } else {
            console.log("No matching user found.");
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId)); // טוען את המידע מ-localStorage
    }
  }, []);

  console.log("userId", userId);
  useEffect(() => {
    dispatch(fetchProfessionals())
      .then(unwrapResult)
      .then((result) => {
        const filtered = result.filter((p) => p.category.id == id);
        console.log("filtered", filtered);
        setFilteredProfessionals(filtered);
      })
      .catch((error) => {
        console.error('Error fetching professionals:', error);
      });
  }, [dispatch, id]);

  //   if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }
  useEffect(() => {
    const fetchCategory = async () => {
      const result1 = await dispatch(fetchCategoryById(id));
      console.log("result", result1.payload);
      if (result1) {
        SetNameCategory(result1.payload.name);
      }
    };
    fetchCategory();
  }, [dispatch, id]);
  console.log("NameCategory", nameCtegory);
  // פונקציה לעדכון החיפוש
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };
  console.log("userId", userId);
  console.log("user", user);
  // סינון בעלי מקצוע לפי שם או טלפון
  const filteredData = filteredProfessionals.filter((p) => {
    return (
      p.theProfessional.name.toLowerCase().includes(query.toLowerCase()) ||
      p.theProfessional.phone.includes(query) ||
      p.theProfessional.placeProfessional.toLowerCase().includes(query.toLowerCase())
    );
  });

  const toggleFavourite = (professionalId) => {
    let updatedFavourites;
    const professionalToAdd = filteredData.find(p => p.id === professionalId);

    if (favourites.some(fav => fav.id === professionalId)) {
      // אם כבר נמצא במועדפים, נסיר אותו
      updatedFavourites = favourites.filter(fav => fav.id !== professionalId);
    } else {
      // אם לא נמצא במועדפים, נוסיף אותו
      updatedFavourites = [...favourites, professionalToAdd];
    }

    // עדכון המועדפים ב-state וב-localStorage
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

    // שליחת המידע ל-RDUX
    const favouritesData = {
      users: { id: userId.id },
      professionals: { id: professionalId },
    };
    console.log("favouritesData", favouritesData);
    // שליחה ל-RDUX
    dispatch(createFavourites(favouritesData));
  };
  console.log("favourites", favourites);




  return (
    <>
      <div className="category-page">
        <Navbar />
        <br />
        <form style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Search professional by name or phone or place"
            value={query}
            onChange={handleSearch}
            style={{
              padding: '10px',
              marginBottom: '8px',
              borderRadius: '4px',
              width: '80vw',
              maxWidth: '50%',
              marginLeft: 'auto',
              marginRight: 'auto',
              border: '1px solid #ccc',
              fontSize: '16px',
              transition: 'border-color 0.3s',
            }}
          />
        </form>



        <h2 className="categories-title" color='#1c0f42'>Professionals in the category {nameCtegory}</h2>
        <div className="categories-container">
          {filteredData.length > 0 ? (
            filteredData.map((p) => (
              <Card
                sx={{
                  width: 320,
                  height: 280,
                  margin: 2,
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0px 2px 5px #1c0f42',
                  borderRadius: 2,

                }}
                key={p.id}
              // onClick={() => navigate(`/PageMan/${p.id}`)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  {/* הצגת האות הראשונה של השם במקום האייקון */}
                  <Avatar sx={{ bgcolor: '#B0B0B0', width: 56, height: 56, margin: '0 auto' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                      {p.theProfessional.name[0]} {/* כאן נלקחת האות הראשונה מהשם */}
                    </Typography>
                  </Avatar>
                  <Typography level="title-lg" sx={{ marginTop: 2, fontWeight: 'bold', fontSize: '18px' }}>
                    {p.theProfessional.name}
                  </Typography>
                  <Typography textColor="neutral.500" sx={{ marginTop: 1, fontSize: '14px' }}>
                    {p.theProfessional.phone}
                  </Typography>

                  <Typography level="body-sm" sx={{ marginTop: 1, color: 'neutral.600', fontSize: '13px' }}>

                    <Button
                      component="a"
                      color="#1c0f42"
                      href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                        p.theProfessional.placeProfessional +
                        " " +
                        (p.theProfessional.city ? p.theProfessional.city + " " : "") +
                        p.theProfessional.address
                      )}`}
                      target="_blank"
                    >
                      {p.theProfessional.address + " " + (p.theProfessional.city ? p.theProfessional.city + " " : "") + p.theProfessional.placeProfessional}
                      <LocationOnRoundedIcon sx={{ fontSize: '16px', marginRight: 1 }} />
                    </Button>
                  </Typography>
                </CardContent>
                <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    color="neutral"
                    sx={{
                      width: '48%', // שולי רוחב
                      color: '#1c0f42', // צבע טקסט
                      borderColor: '#1c0f42', // צבע גבול
                      '&:hover': {
                        backgroundColor: '#1c0f42', // צבע הרקע בעת hover
                        color: 'white', // צבע טקסט בעת hover
                        borderColor: '#1c0f42', // שמירה על גבול צבע בעת hover
                      },
                    }}
                    onClick={() => navigate(`/PageMan/${p.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="neutral"
                    sx={{
                      width: '48%',
                      color: favourites.some(fav => fav.theProfessional.id === p.id) ? 'red' : '#1c0f42',
                      borderColor: favourites.some(fav => fav.theProfessional.id === p.theProfessional.id) ? 'red' : '#1c0f42',
                    }}
                    onClick={() => toggleFavourite(p.id)}
                  >
                    {favourites.some(fav => fav.id === p.id) ? 'Remove from favourites' : 'Add to favourites'}
                  </Button>
                </Box>
              </Card>
            ))
          ) : (
            <p>אין בעלי מקצוע בקטגוריה הזו</p>
          )}

          <Card
            sx={{
              minWidth: 320,
              maxWidth: 340,
              margin: 2,
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 5px #1c0f42',
              borderRadius: 2,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '100%' }}
              onClick={() => navigate('/UploadConect', { state: { category: { id: id } } })}

            >
              To add a professional
            </Button>
          </Card>
        </div>
      </div>
      <Contact />
    </>
  );
};

export default Category;
