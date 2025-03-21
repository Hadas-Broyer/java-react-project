import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { updateCategoryById } from '../features/Category/CategorySlice'; // ודא שאתה מייבא את הפעולה הנכונה
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import Navbar from './Navbar';

function Upload() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const formData = location.state;

    const handleConfirm = () => {
        const categoryData = {
            name: formData.name,
            address: formData.address,
            description: formData.description,
            price: formData.price,
            phone: formData.phone,
            email: formData.email,
            subject: formData.subject,
            years: formData.years,
            password: formData.password,
            placeProfessional: formData.placeProfessional,
            city: formData.city,
            newProfessional: {
                name: formData.name,
                address: formData.address,
                price: formData.price,
                phone: formData.phone,
                email: formData.email,
                subject: formData.subject,
                years: formData.years,
                placeProfessional: formData.placeProfessional,
                city: formData.city
            }
        };
        dispatch(updateCategoryById({ id: formData.category, categoryData }))
            .then((res) => {
                alert(" Added successfully!");
                navigate('/Category');  // ניווט לדף הבית לאחר ההצלחה
            })
            .catch((error) => {
                alert("Error adding the professional please try again");
            });
    };

    return (
        <>
            <Navbar />
            <br />  <br />  <br />  <br />  <br />

            <Box sx={{ padding: 0, backgroundColor: '#f4f4f4', minHeight: '60vh' }}>
                <Paper sx={{ padding: 0, boxShadow: 3, borderRadius: 2 }}>
                    {formData ? (
                        <div>
                            <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
                            Details of a registered professional:
                            </Typography>
                            <Grid container spacing={2} sx={{ textAlign: 'center', marginBottom: 6 }} >
                                <Grid item xs={40} sm={40}>
                                    <Typography variant="body1"><strong>Name:</strong> {formData.name}</Typography>
                                    <Typography variant="body1"><strong>address:</strong> {formData.address}</Typography>
                                    {formData.city && (
                                        <Typography variant="body1"><strong>city:</strong> {formData.city}</Typography>
                                    )}
                                    <Typography variant="body1"><strong>About me:</strong> {formData.description}</Typography>
                                    <Typography variant="body1"><strong>The min price:</strong> {formData.price}</Typography>
                                    <Typography variant="body1"><strong>Phone number:</strong> {formData.phone}</Typography>

                                    <Typography variant="body1"><strong>email address:</strong> {formData.email}</Typography>
                                    <Typography variant="body1"><strong>places of study:</strong> {formData.subject}</Typography>
                                    <Typography variant="body1"><strong>Years experience:</strong> {formData.years}</Typography>
                                    <Typography variant="body1"><strong>password:</strong> {formData.password}</Typography>
                                    <Typography variant="body1"><strong>country:</strong> {formData.placeProfessional}</Typography>
                                </Grid>
                            </Grid>
                            <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                                <Button variant="contained" sx={{ backgroundColor: '#1c0f42' }} onClick={handleConfirm}>
                                    Confirm and add to category
                                </Button>
                            </Box>
                        </div>
                    ) : (
                        <Typography variant="body1" color="error">No details found.
                        </Typography>
                    )}
                </Paper>
            </Box>
        </>
    );
}

export default Upload;
