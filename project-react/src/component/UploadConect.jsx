import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { createProfessional } from '../features/Professional/ProfessionalSlice';
import { TextField, Button, Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import Navbar from './Navbar';

function UploadConect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { category } = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        description: '',
        price: '',
        phone: '',
        email: '',
        subject: '',
        years: '',
        password: '',
        category: category,
        images: [],
        placeProfessional: '',
        city: '',
    });

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleFileChange = (e) => {
        const files = e.target.files;
        const imagesArray = Array.from(files);
        setFormData({
            ...formData,
            images: imagesArray
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (formData.name.length < 3) {
            setMessage('Username must be at least 3 characters');
            return;
        }

        const phoneCheck = /^[0-9]{10}$/;
        if (!phoneCheck.test(formData.phone)) {
            setMessage('The phone number must be 10 digits long.');
            return;
        }

        const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailCheck.test(formData.email)) {
            setMessage('The email address is invalid');
            return;
        }

        const passwordCheck = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
        if (!passwordCheck.test(formData.password)) {
            setMessage('Password must be at least 8 characters and include at least 2 letters');
            return;
        }

        if (!formData.description) {
            setMessage('You must add a description');
            return;
        }

        // יצירת FormData לשליחה לשרת
        const form = new FormData();
        form.append('user', new Blob([JSON.stringify({
            name: formData.name,
            address: formData.address,
            description: formData.description,
            price: formData.price,
            phone: formData.phone,
            email: formData.email,
            subject: formData.subject,
            years: formData.years,
            password: formData.password,
            category: formData.category.id,
            placeProfessional: formData.placeProfessional,
            city: formData.city
        })], { type: 'application/json' }));

        formData.images.forEach((image) => {
            form.append('images', image);
        });

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/theProfessional/addPicture', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                const professionalData = {
                    name: formData.name,
                    address: formData.address,
                    description: formData.description,
                    price: formData.price,
                    phone: formData.phone,
                    email: formData.email,
                    subject: formData.subject,
                    years: formData.years,
                    password: formData.password,
                    uploadDate: new Date().toISOString(),
                    imageUrls: response.data.imageUrls,
                    placeProfessional: response.placeProfessional,
                    city: formData.city
                };

                const professionalsData = {
                    theProfessional: { id: response.data.id },
                    category: { id: formData.category.id }
                };

                dispatch(createProfessional(professionalsData))
                    .then(() => {
                        setMessage('Data sent successfully!');
                        navigate('/Upload', { state: formData });
                    });
            }
        } catch (error) {
            console.error('Error uploading professional data:', error);
            setMessage('There was an error uploading the data or images. Try again');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="sm" sx={{ padding: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Professional registration
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Min price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="phone number"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Study Places"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="cantry"
                                name="placeProfessional"
                                value={formData.placeProfessional}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Years of experience "
                                name="years"
                                type="number"
                                value={formData.years}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f0f0f0',  // צבע הרקע של תיבת הטקסט
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                style={{ width: '100%' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isLoading}
                                sx={{ backgroundColor: '#1c0f42' }}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Registration confirmation'}
                            </Button>
                        </Grid>
                    </Grid>
                    {message && (
                        <Box sx={{ mt: 2, textAlign: 'center', color: 'red' }}>
                            <Typography variant="body1">{message}</Typography>
                        </Box>
                    )}
                </form>
            </Container>
        </>
    );
}

export default UploadConect;
