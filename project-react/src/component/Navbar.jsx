
import React, { useState, useEffect } from 'react';
// import '../cssPages/navbar.css';  
import { Drawer, Button, AppBar, Toolbar, IconButton, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // פרטי המשתמש
  const navigate = useNavigate(); // ניווט לעמודים
  const [isProfileOpen, setIsProfileOpen] = useState(false); // האם חלונית הפרופיל פתוחה

  useEffect(() => {
    const user = localStorage.getItem('user'); // קבלת פרטי משתמש מקומית
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser); // עדכון פרטי המשתמש
    }
  }, []);

  // פתיחת וסגירת ה-Drawer (החלונית הצדית)
  const toggleDrawer = () => {
    setIsProfileOpen(!isProfileOpen); // סיבוב מצב החלונית (פתיחה/סגירה)
  };

  // תוכן החלונית
  const profileContent = (

    <div style={{ padding: '20px', width: '18vw', height: '100%', backgroundColor: '#f0f0f0' }}>

      <h3>User profile</h3>
      {user ? (
        <>
          <div>name user: {user.username}</div>
          <div>email: {user.email}</div>
          <div>phone number: {user.phone}</div>
        </>
      ) : (
        <div>No user found</div>
      )}
      <Button onClick={toggleDrawer} style={{ marginTop: '20px' }}>
        close
      </Button>
      <Button style={{ marginTop: '20px' }} onClick={() => navigate('/FavouriteUser')}>your favourites</Button>
    </div>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#1c0f42', width: '98vw' }}>
        <Toolbar>

          {/* כפתור תפריט */}
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
            {/* הצגת האות הראשונה של שם המשתמש במקום האייקון */}
            <Avatar sx={{ bgcolor: '#B0B0B0', width: 50, height: 50, margin: '0 auto' }}>
              {user ? (
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                  {user.username[0]}
                </Typography>
              ) : (
                <AccountCircleIcon />
              )}
            </Avatar>
          </IconButton>


          {/* ניווט ישיר לכפתורים */}

          <div dir="ltr" className="navbar-nav" style={{ marginLeft: 'auto', width: '89vw' }}>
            <Button color="inherit" onClick={() => navigate('/')}>logOut{<ExitToAppIcon />}</Button>
            <Button color="inherit" onClick={() => navigate('/homePage')}>Home page{<HomeIcon />}</Button>
            <Button color="inherit" onClick={() => navigate('/categories')}>Categories</Button>
            {/* <Button color="inherit" onClick={() => navigate('/contact')}>צור קשר</Button> */}
            <Button color="inherit" onClick={() => navigate('/professionals')}>All professionals</Button>
            <Button color="inherit" onClick={() => navigate('/CommentsSite')}>Comments site</Button>
            <Button color="inherit" onClick={() => navigate('/LoginProfessional')}>Enter professional</Button>
            {/* <Button color="inherit" onClick={() => navigate('/Needed')}>Needed</Button> */}


          </div>
          <img
            src="../לרקעע/Asset-1@2x-300x226.png"
            alt="MyBCard Logo"
            style={{ height: '40px', marginLeft: '10px' }}
          />
        </Toolbar>
      </AppBar>


      <Drawer dir="ltr" anchor="left" open={isProfileOpen} onClose={toggleDrawer}>
        {profileContent}
      </Drawer>
    </>
  );
}

export default Navbar;//
