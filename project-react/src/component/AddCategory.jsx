import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from '../features/Category/CategorySlice';
import { Button, TextField, Typography, Box } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';

const AddCategory = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleAddCategory = async (event) => {
    event.preventDefault();

    if (!name || !description) {
      setStatus('אנא מלא את כל השדות');
      return;
    }

    const categoryData = {
      description,
      name,
    };

    try {
      const actionResult = await dispatch(createCategory(categoryData));
      unwrapResult(actionResult);
      setStatus('  Category successfully added!');

      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding category:', error);
      setStatus(' An error occurred while adding the category ');
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 4 }}>
      <Typography variant="h4" gutterBottom>הוסף קטגוריה</Typography>

      {/* טופס להוספת קטגוריה */}
      <form onSubmit={handleAddCategory}>
        <TextField
          label="Name category"
          value={name}
          onChange={handleNameChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Description category"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          הוסף קטגוריה
        </Button>
      </form>

      {/* תצוגת סטטוס */}
      {status && <Typography variant="body1" sx={{ mt: 2, color: status.includes('הצלחה') ? 'green' : 'red' }}>{status}</Typography>}
    </Box>
  );
};

export default AddCategory;
