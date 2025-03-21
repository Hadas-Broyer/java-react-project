import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Contact from "./contact";
import { useDispatch, useSelector } from "react-redux";
import { createCommentForSite, fetchCommentForSite } from '../features/comment/commentSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Box, Button, TextField, Typography, Grid, Card, CardContent, CardActions, Rating, Avatar } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import { Send } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CommentsSite = () => {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(1);
  const [addM, setAddM] = useState(false);
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const { commentss, loading, error } = useSelector((state) => state.comment || []); // Fetch all comments
  const [userName1, setUserName1] = useState('');


  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUserName = JSON.parse(user);
      if (parsedUserName && parsedUserName.username) {
        setUserName1(parsedUserName.username);
      }
    }
  }, []);
  console.log("userName:", userName1);


  useEffect(() => {
    const fetchCommentForSites = async () => {
      try {
        if (comments.length == 0) {
          const actionResult = await dispatch(fetchCommentForSite());
          unwrapResult(actionResult);
          setComments(actionResult.payload);
          console.log("actionResult", actionResult.payload);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchCommentForSites();
  }, [dispatch, addM]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    const commentData = {
      theProfessional: null,
      comment: newComment,
      rating: rating,
      date: new Date().toISOString(),
      userName: userName1,
    };
    setAddM(true);
    dispatch(createCommentForSite(commentData));
    setNewComment('');
    setRating(1);
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>;

  return (
    <>
      <Navbar />

      {/* Add Comment Form */}
      <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 4, textAlign: 'center' }}>
        <form onSubmit={handleSubmitComment}>
          <Typography variant="h4" gutterBottom>Add comment for our website</Typography>

          {/* Rating */}
          <Box mb={2}>
            <Typography variant="body1">rating:</Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
            />
          </Box>

          {/* Comment Textarea */}
          <TextField
            label="Enter Comment"
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
              boxShadow: '0 4px 8px #1c0f42',
              '& .MuiInputBase-root': {
                fontSize: '1.1rem',
              }
            }}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#1c0f42' }}>
            <Send sx={{ fontSize: 20 }} />
            send comment! </Button>
        </form>
      </Box>

      {/* Comments List */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>Comments about our website</Typography>

        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} sx={{ mb: 3, borderRadius: 2, border: '1px solid #ddd', backgroundColor: '#f0f0f0', boxShadow: '0 4px 8px #1c0f42', }}>
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
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{comment.userName}</Typography>
                </Box>
                {/* Rating */}
                <Box display="flex" alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>rating:</Typography>
                  <Rating value={comment.rating} readOnly precision={0.5} size="large" /> {/* הגדל את הכוכבים */}
                </Box>
                {/* Comment */}
                <Box display="flex" alignItems="center" >
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 3 }}>User name:</Typography>
                  <Typography variant="body2" mt={2}>{comment.userName}</Typography>
                </Box>
                <Typography variant="body2" mt={2}>{comment.comment}</Typography>
                {/* Date */}
                <Typography variant="body2" color="textSecondary" mt={1}>{comment.date}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No comments are currently available.</Typography>
        )}
      </Box>

      <Contact />
    </>
  );
};

export default CommentsSite;
