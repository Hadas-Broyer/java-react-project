import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/theProfessional/theProfessionalSlice';
import Navbar from './Navbar';
import Contact from './contact';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';

function LoginProfessional() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // States for the update form (עדכון בעל המקצוע)
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);

        dispatch(loginUser({ username, email, password }))
            .then((result) => {
                console.log('Result from dispatch:', result);
                if (result && result.payload && result.payload.id) {
                    console.log('Successful login:', result.payload);
                    navigate(`/ProfessionalArea/${result.payload.id}`);
                } else {
                    setError(' Error login');
                    console.error('No id in response:', result);
                }
            })
            .catch((err) => {
                setError('Error login ');
                console.error('Error during login:', err);
            });
    };

    return (
        <div>
            <Navbar />

            <Container maxWidth="xs" sx={{ mt: 4, marginTop: '9%', marginBottom: '9%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: '#fff',
                    }}
                >
                    <Typography variant="h6" gutterBottom>Entry of a professional</Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '8%' }}>
                        <TextField
                            label="Professional name"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#f0f0f0',
                                }
                            }}
                        />
                        <TextField
                            label="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#f0f0f0',
                                }
                            }}
                        />
                        <TextField
                            label="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#f0f0f0',
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ backgroundColor: '#1c0f42' }}
                            style={{ marginTop: '10px' }}
                        >
                            enter
                        </Button>
                    </form>
                </Box>
            </Container>

            <Contact />
        </div>
    );
}

export default LoginProfessional;
