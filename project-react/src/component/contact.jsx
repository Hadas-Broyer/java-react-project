import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Divider, IconButton, Input, Typography, List, ListItem, ListItemButton, Sheet } from '@mui/joy';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from "axios";

const Contact = () => {

  const [email, setEmail] = useState(''); // מייל שנכנס מה-Input
  const [message, setMessage] = useState(''); // הודעת שגיאה/הצלחה
  const [isLoading, setIsLoading] = useState(false); // משתנה למעקב אחר טעינה
  const user1 = localStorage.getItem('userId');
  const user = JSON.parse(user1);

  // console.log("user", user1);
  // console.log("tttt",user.username);
  // פונקציה לשליחת המייל לשרת
  const handleNewsletterSubmit = async () => {
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }
    console.log("qqqq", email);
    console.log("pjpjpjjp", user.username);
    setIsLoading(true);
    const newsletter = {
      userEmail: email,
      userName: user.username,
    };
    console.log("newsletter", newsletter);
    try {
      console.log("fffddffddffddfdd");
      console.log("newsletter", newsletter);
      const response = await axios.post('http://localhost:8080/api/newsletter/addNewsletter', newsletter
      );
      console.log("response", response);

      if (response.status === 201) {
        setMessage('You have successfully subscribed to the newsletter!');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage('This email is already subscribed.');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Sheet
      variant="solid"
      color="neutral"
      invertedColors
      sx={{
        pt: 2,
        pb: 3,
        px: 2,
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        backgroundColor: '#333',
      }}
    >
      <Box dir="ltr" sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* החלק העליון */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box>
            <Typography level="h6" color="white" textAlign="right">
              Look for us
            </Typography>
            <Box
              className="a2a_kit a2a_kit_size_32 a2a_default_style"
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <IconButton variant="plain" color="neutral" sx={{ color: 'white' }}>
                <FacebookRoundedIcon />
              </IconButton>
              <IconButton variant="plain" color="neutral" sx={{ color: 'white' }}>
                <GitHubIcon />
              </IconButton>
              <IconButton variant="plain" color="neutral" sx={{ color: 'white' }}>
                <EmailRoundedIcon />
              </IconButton>
            </Box>
          </Box>

          {/* יצירת קשר */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography level="h6" color="white" textAlign="left">
              to contact
            </Typography>
            <List sx={{ padding: 0 }}>
              <ListItem>
                <ListItemButton component={Link} to="/Professionals" sx={{ color: 'white' }}>
                  The professional
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{ color: 'white' }}>phone nmber: 043321832</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{ color: 'white' }}>email: awebsiteforbusinesspromotion@gmail.com</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} to="/CommentsSite" sx={{ color: 'white' }}>
                  comments
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

          {/* רשום על העסק */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography level="h6" color="white" textAlign="right">
              A website to promote independent businesses
            </Typography>
            <Typography level="body2" color="white" textAlign="right">
              We on the site want to help promote aloso to a small businesses
              <br />
              We would love to hear from you.

            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, bgcolor: 'neutral.600' }} />

        {/* חיבור עם מייל */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography level="h6" color="white" textAlign="center">
            Sign up for the newsletter
          </Typography>
          <Input
            variant="outlined"
            color="neutral"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            endDecorator={
              <IconButton
                variant="soft"
                color="primary"
                onClick={handleNewsletterSubmit}
                disabled={isLoading}
              >
                <SendIcon />
              </IconButton>
            }
            sx={{ width: '80%', mt: 1, bgcolor: 'neutral.800', borderRadius: '8px' }}
          />
          {message && (
            <Typography color={message.includes('successfully') ? 'green' : 'red'} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3, bgcolor: 'neutral.600' }} />

        {/* החלק התחתון */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography level="body2" color="neutral.400" textAlign="left">
            All rights reserved<span style={{ color: '#FF9900' }}>A website to promote independent businesses</span> All rights reserved
          </Typography>
          <Typography level="body2" color="neutral.400" textAlign="right">
            Developed and Designed by <span style={{ fontWeight: 'bold' }}>Hadas</span>
          </Typography>
        </Box>
      </Box>
    </Sheet>
  );
};

export default Contact;
