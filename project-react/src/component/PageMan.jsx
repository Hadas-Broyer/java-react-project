import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessionalById, updateProfessionalById } from '../features/Professional/ProfessionalSlice';
import { fetchCommentById, createComment } from '../features/comment/commentSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, TextField, Tab, Tabs, MenuItem, Rating, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import Navbar from './Navbar';
import Contact from './contact';
import { ThumbUp } from '@mui/icons-material';
import { Link } from "react-router-dom";
import Chat from "./Chat";
import { fetchUser } from '../features/user/userSlice';
import { Send } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function PageMan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("idididididid", id);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(1);
  const [professionalImages, setProfessionalImages] = useState([]); // מצב לתמונות
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [sendingStatus, setSendingStatus] = useState('');
  const [tabIndex, setTabIndex] = useState(0); // ניהול האינדקס של ה-Tab

  const { professional, loading, error } = useSelector((s) => s.professional);
  const [the1, setThe1] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [user1, setUser1] = useState(null);
  const [user12, setUser12] = useState(null);
  const [l, setL] = useState(null);


  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUserEmail = JSON.parse(user);
      console.log("parsedUserEmail", parsedUserEmail);
      setUser1(parsedUserEmail);
      if (parsedUserEmail && parsedUserEmail.email) {
        setUserEmail(parsedUserEmail.email);
      }
      const parsedUserName = JSON.parse(user);
      if (parsedUserName && parsedUserName.username) {
        setUserName(parsedUserName.username);
      }
    }
  }, []);
  console.log("user1", user1);


  useEffect(() => {
    const fetchData = async () => {
      if (id) {

        try {
          const actionResult = await dispatch(fetchProfessionalById(id));
          unwrapResult(actionResult);
          console.log("actionResultactionResult", actionResult.payload);
          setThe1(actionResult.payload);
        } catch (err) {
          console.error("Error fetching professional:", err);
        }
      }
    };
    fetchData();
  }, [dispatch, id]);
  console.log("the111111rttttt", the1);
  // שליפת התמונות
  useEffect(() => {
    const fetchImages = async () => {
      if (id) {
        try {
          if (professionalImages.length === 0) {
            const response = await axios.get(`http://localhost:8080/api/theProfessional/getDto/${id}`);
            const imageUrls = response.data.images.map((imageData) => {
              return `data:image/jpeg;base64,${imageData}`; // המרה ישירה ל-Base64 URL
            });
            setProfessionalImages(imageUrls);
          }
        } catch (err) {
          console.error("Error fetching images:", err);
        }
      }
    };
    fetchImages();
  }, [id, professionalImages]);

  const handleCommentChange = (event) => setNewComment(event.target.value);
  const handleRatingChange = (event) => setRating(Number(event.target.value));

  const handleSubmitComment = (event) => {
    event.preventDefault();

    const commentData = {
      theProfessional: the1,
      comment: newComment,
      rating: rating,
      date: new Date().toISOString().split('T')[0],
      userName: userName,
    };

    dispatch(createComment(commentData));
    const newCommentData = {
      ...commentData,
      id: Math.random().toString(36).substring(7),
    };
    setComments([newCommentData, ...comments]);
    setNewComment('');
    setRating(1);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (id) {
        if (comments.length == 0) {
          try {

            const actionResult = await dispatch(fetchCommentById(id));
            unwrapResult(actionResult);
            setComments(actionResult.payload);
          } catch (err) {
            console.error("Error fetching comments:", err);
          }
        }
      };
    }
    fetchComments();
  }, [dispatch, id]);

  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleSendEmail = async () => {
    if (!message) {
      alert("The message cannot be empty!");
      return;
    }
    setSendingStatus("sending...");
    const emailDetails = {
      recipient: the1.theProfessional.email,
      subject: userName + "  Sending you a message  " + userEmail,
      msgBody: message,
    };
    try {
      await axios.post("http://localhost:8080/sendMail", emailDetails);
      setSendingStatus("The message sent successfully!");
    } catch (error) {
      setSendingStatus("Error sending the message.");
      console.error("There was an error sending the email:", error);
    }
  };


  console.log("the11111111", the1);
  console.log("user11111", user1);
  useEffect(() => {
    const fetchD = async () => {
      try {
        console.log("user1111999991", user1);
        const actionResult = await dispatch(fetchUser());
        const result = unwrapResult(actionResult);
        console.log("result", result);
        console.log("99999999999999999999999999999999999", user1);
        if (!user1) {
          console.log("user1 is not defined");
          return;
        }
        if (result) {
          const foundUser = result.find((userItem) =>
            user1.username === userItem.username &&
            user1.password === userItem.password
          );
          console.log("foundUser", foundUser);
          if (foundUser) {
            console.log("Found matching user:", foundUser);
            setUser12(foundUser);
          } else {
            console.log("No matching user found.");
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchD();
  }, [dispatch, user1]);
  console.log("User12", user12);
  console.log("userName:", userName);


  const handleAddLike = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/likesController/addLikes', {
        professionals: { id: the1.id },
        users: { id: user12.id },

      });
      console.log("the1", the1);
      console.log("users", user12);
      console.log("response", response);
      if (response.status === 200) {
        if (the1.likes > 0) {
          the1.likes--;
        }
      } else if (response.status === 201) {
        the1.likes++;
      }


      setThe1({ ...the1 });
      console.log("  setThe1({ ...the1 })", the1);
      console.log("Like action completed successfully!");
    } catch (error) {
      console.error("Error handling like action", error);
    }
  };



  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;

  if (!the1) return <p>No information was found about the professional.</p>;


  console.log("user12.userName", user12);
  return (
    <>
      <Navbar />
      {/* <Chat/> */}
      <br />  <br />  <br />
      <Container>
        <Box display="flex" flexDirection="row" gap={4}>
          {/* תמונות של איש המקצוע */}
          <Box
            width="50%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{
              borderRadius: '10px',
              boxShadow: '0 4px 8px #1c0f42',
              padding: '10px',
              backgroundColor: 'grey.100'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: '10px' }}>
              <img src={professionalImages[tabIndex]} alt="Professional" style={{ width: '60%', height: '350px', borderRadius: '10px', objectFit: 'cover' }} />
            </div>
            <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
              {professionalImages.map((_, index) => (
                <Tab key={index} label={`image ${index + 1}`} />
              ))}
            </Tabs>
            {/* לייק */}
            <Box dir="rtl" display="flex" alignItems="center" gap={1}>
              <Button
                onClick={handleAddLike}
                variant="contained"
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: '#1c0f42',
                }}
              >
                <ThumbUp sx={{ fontSize: '20px' }} />
              </Button>
              <Typography>{the1.likes}: Likes</Typography>
            </Box>
          </Box>

          {/* פרטי איש המקצוע */}
          <Box
            dir="ltr"
            width="50%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{
              borderRadius: '10px',
              boxShadow: '0 4px 8px #1c0f42',
              padding: '10px',
              backgroundColor: 'grey.100'
            }}
          >
            <Card sx={{ boxShadow: '0 4px 8px #1c0f42' }}>
              <CardContent>
                <Typography variant="h4">{the1.theProfessional.name}</Typography>
                <Typography variant="h6"><strong>Phone number:</strong> {the1.theProfessional.phone}</Typography>
                <Typography variant="h6"><strong>address:</strong> {the1.theProfessional.address}</Typography>
                {the1.theProfessional.city && (
                  <Typography variant="h6"><strong>city:</strong> {the1.theProfessional.city}</Typography>
                )}
                <Typography variant="h6"><strong>The min price:</strong> {the1.theProfessional.price}</Typography>
                <Typography variant="h6"><strong>email address:</strong> {the1.theProfessional.email}</Typography>
                <Typography variant="h6"><strong>Years experience:</strong> {the1.theProfessional.years}</Typography>
                <Typography variant="h6"><strong> places of study:</strong> {the1.theProfessional.subject}</Typography>
                <Typography variant="h6"><strong>country:</strong> {the1.theProfessional.placeProfessional}</Typography>
                <Typography variant="h6"><strong>About me:</strong> {the1.theProfessional.description}</Typography>
              </CardContent>
            </Card>

            {/* קישור לגוגל מאפס */}
            {the1.theProfessional.address && (
              <Box mt={2}>
                <Typography variant="h6">Professional Location:</Typography>
                <Button
                  variant="contained"
                  href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                    the1.theProfessional.address +
                    " " +
                    the1.theProfessional.placeProfessional +
                    (the1.theProfessional.city ? " " + the1.theProfessional.city : "")
                  )}`}
                  target="_blank"
                  sx={{
                    backgroundColor: '#1c0f42',
                  }}
                >
                  View the address on Google Maps
                </Button>
              </Box>
            )}

            {/* ווצאפ */}
            <Box sx={{ zIndex: 9999, position: 'fixed', bottom: 20, right: 20 }}>

              {/* לבדוק עם קוד של מדינה כאילו לי מדינה אולי עם איזה API חיצוני */}
              <a href={`https://wa.me/+972${the1.theProfessional.phone}?text=Hello%20I%20found%20you%20through%20the%20website!%20I'm%20interested%20in%20your%20services.`} target="_blank">
                <button style={{
                  backgroundColor: '#25d366',
                  color: 'white',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  fontSize: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '30px', height: '30px' }} />
                </button>
              </a>
            </Box>

            {/* שליחת הודעה */}
            <Box mt={4} >
              <TextField
                label="Enter your text hear:"
                multiline
                rows={4}
                fullWidth
                value={message}
                onChange={handleMessageChange}
                variant="outlined"

                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                  },
                  '& .MuiInputBase-input': {
                    color: '#000',  // צבע הטקסט בתוך תיבת הטקסט
                  },

                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendEmail}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: '10px 20px',
                  backgroundColor: '#1c0f42',
                }}
              >
                <Send sx={{ fontSize: 20 }} />
                Send a message
              </Button>
              <Typography>{sendingStatus}</Typography>
            </Box>


          </Box>
        </Box>

        {/* תגובות */}
        <Container>
          <Box mt={4}>
            <Typography variant="h5">Add a comment</Typography>
            <form onSubmit={handleSubmitComment}>
              {/* דירוג */}
              <Rating
                name="rating"
                value={rating}
                onChange={handleRatingChange}
                precision={0.5}
                size="large"
              />
              <TextField
                label="Enter your comment"
                multiline
                rows={4}
                fullWidth
                value={newComment}
                onChange={handleCommentChange}
                required
                sx={{
                  mb: 2,
                  backgroundColor: '#f0f0f0',
                  textAlign: 'right',
                  borderRadius: 1,
                }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#1c0f42' }}>
                <Send sx={{
                  backgroundColor: '#1c0f42',
                  fontSize: 20,
                }} />
                Add a comment
              </Button>
            </form>
          </Box>

          {/* תצוגת התגובות */}
          <Box mt={4}>
            <Typography variant="h6">Comments</Typography>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <Box key={comment.id} p={2} border="1px solid #ddd" borderRadius="10px" mb={2} sx={{ backgroundColor: 'grey.100', boxShadow: '0 4px 8px #1c0f42', }}>
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
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{comment.userName}</Typography>
                  </Box>

                  {/* הצגת הדירוג עם כוכבים */}
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>Rating:</Typography>
                    <Rating value={comment.rating} readOnly precision={0.5} size="small" />
                  </Box>

                  <Typography variant="body2" mt={2}>{comment.comment}</Typography>
                  <Typography variant="body2" color="textSecondary">{comment.date}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No comments available</Typography>
            )}
          </Box>
        </Container>
      </Container>

      <Contact />
    </>
  );
}

export default PageMan;
