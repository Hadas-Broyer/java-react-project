import React, { Fragment, useEffect, useState } from 'react';
import { Button, TextField, Box, Typography, Container, Grid, Paper, Modal, Alert } from '@mui/material';
import { Star } from '@mui/icons-material'; // אייקון כוכב מ-MUI
import { loginUser, signupUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

function Login() {
    const [openModal, setOpenModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        username: yup.string().min(4, 'Username must be at least 4 characters long').required('Username is required'),
        email: yup.string().email('Enter a valid email address').required('Email is required'),
        phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
    });
    
    useEffect(()=>{
       localStorage.removeItem('user')
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');  
        try {
            let userData = { username, password };
            if (isLogin) {
                if (username == 'Hadas Broyer' && password == 'hadas328283') {
                    navigate('/AdminArea');
                    return;
                }

                await dispatch(loginUser(userData)).unwrap();
                navigate('/HomePage');
            } else {
                userData = { ...userData, email, phone };
                try {
                    await validationSchema.validate(userData, { abortEarly: false });
                    await dispatch(signupUser(userData)).unwrap();
                    navigate('/HomePage');
                }
                catch (validationErrors) {
                    // אם יש שגיאות, הצג אותם
                    const errors = validationErrors.inner.reduce((acc, error) => {
                        acc[error.path] = error.message;
                        return acc;
                    }, {});

                    setError(errors); // עדכן את ה-state עם השגיאות
                }
            }
        } catch (error) {
            setError("One of the IDs is incorrect. Please try again or register again...");
            console.error('Login/SignUp failed:', error);
        }
    };

    return (
        <Fragment>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#1c0f42',
                    padding: '10px 20px',
                    color: '#ffffff',
                }}
            >


                <Button
                    sx={{
                        background: '#ffffff',
                        color: '#1c0f42',
                        fontWeight: 'bold',
                        '&:hover': {
                            background: '#1c0f42',
                            color: '#ffffff',
                        },
                    }}
                    onClick={() => setOpenModal(true)}
                >
                    Login / SignUp
                </Button>
                <img
                    src="לרקעע/Asset-1@2x-300x226.png"
                    alt="MyBCard Logo"
                    style={{ height: '40px' }}
                />
            </Box>
            {/* Header with Logo and Login Button */}
            <Box
                sx={{
                    backgroundImage: 'url(../לרקעע/close-up-businessman-showing-blank-white-visiting-card-copy.jpg)', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '80vh',
                    position: 'relative', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Overlay to darken the background */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: -1,
                    }}
                ></Box>

                <Container sx={{ marginTop: '520px', padding: '3%' }}>
                    <Grid container spacing={3} justifyContent="center">
                        {/* First Box */}
                        <Grid item xs={12} sm={4}>
                            <Paper
                                sx={{
                                    padding: '30px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                                    },
                                }}
                            >
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Typography variant="h5" sx={{ color: '#1c0f42', fontWeight: 'bold', marginTop: '20px' }}>
                                    Send with a click
                                </Typography>
                                <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                    Send your business card with the click of a button, with a direct link to each detail.
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Second Box */}
                        <Grid item xs={12} sm={4}>
                            <Paper
                                sx={{
                                    padding: '30px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                                    },
                                }}
                            >
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Typography variant="h5" sx={{ color: '#1c0f42', fontWeight: 'bold', marginTop: '20px' }}>
                                    Dynamic card
                                </Typography>
                                <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                    Your card always stays up to date. No need to reprint!
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Third Box */}
                        <Grid item xs={12} sm={4}>
                            <Paper
                                sx={{
                                    padding: '30px',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                                    },
                                }}
                            >
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Typography variant="h5" sx={{ color: '#1c0f42', fontWeight: 'bold', marginTop: '20px' }}>
                                    personal card
                                </Typography>
                                <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                    You can customize your business card personally, with all the important details.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* What is Digital Business Card Section */}
            <Box sx={{ marginTop: '110px', textAlign: 'center', backgroundColor: '#f8f8f8', padding: '80px' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1c0f42' }}>
                    What is our website??
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '20px', width: '80%', margin: '0 auto', color: '#333' }}>
                    Our website is designed to be a central place where business owners can showcase their work, share their skills, and connect directly with potential clients. Whether you're a professional in construction, design, marketing, planning, or any other field – we are here to help you get exposure and grow.<br /><br />

                    Our platform offers a variety of categories that will allow you to present your skills and projects in a focused and accessible way. Clients searching for your services will be able to easily find you, review your previous work, and contact you directly for collaboration.<br /><br />

                    We believe in direct and transparent connections between business owners and clients, and offer simple yet advanced management tools to help you manage your business and build new relationships. Join us today and become part of our professional business community!<br /><br />
                    
                    If you're just a user, simply log in and enjoy browsing the website to view the work of professionals in various categories.<br /><br />
                    
                    If you're a professional, there are 4 easy steps to join our platform and become part of our professional network. Once you register, you can showcase your work, connect with potential clients, and grow your business.<br /><br />

                    We believe in direct and transparent connections between business owners and clients, and offer simple yet advanced management tools to help you manage your business and build new relationships. Join us today and become part of our professional business community!<br /><br />
                </Typography>
            </Box>

            {/* How to Create a Digital Business Card - 4 Steps */}
            <Box sx={{ marginTop: '60px', textAlign: 'center', padding: '3%' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1c0f42' }}>
                    How to build a digital business card in 4 simple steps
                </Typography>
                <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '40px' }}>
                    {/* Step 1 */}
                    <Grid item xs={12} sm={3} sx={{ order: 4 }}>
                        <Paper
                            sx={{
                                padding: '20px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, height: '100%' }}>
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                            </Box>
                            <Typography variant="h6" sx={{ color: '#1c0f42', fontWeight: 'bold', marginTop: '10px', height: '100%' }}>
                                Register on the website
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: '10px', height: '100%' }}>
                                Our site provides a browsing experience for both the user and the professional, so you need to register...
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Step 2 */}
                    <Grid item xs={12} sm={3} sx={{ order: 3 }}>
                        <Paper
                            sx={{
                                padding: '20px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, height: '100%' }}>
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                            </Box>
                            <Typography variant="h6" sx={{ color: '#1c0f42', fontWeight: 'bold', marginTop: '10px', height: '100%' }}>
                                Enter the category you are interested in
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: '10px', height: '100%' }}>
                                In the category you are interested in, there will be an option to add a professional and there you will enter...
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Step 3 */}
                    <Grid item xs={12} sm={3} sx={{ order: 2 }}>
                        <Paper
                            sx={{
                                padding: '20px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, height: '100%' }}>
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                            </Box>
                            <Typography variant="h6" sx={{ color: '#1c0f42', fontWeight: 'bold', marginTop: '10px', height: '100%' }}>
                                Enter the details about yourself
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: '10px', height: '100%' }}>
                                Enter all the details about you and your profession, including pictures of your work...
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Step 4 */}
                    <Grid item xs={12} sm={3} sx={{ order: 1 }}>
                        <Paper
                            sx={{
                                padding: '20px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, height: '100%' }}>
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                                <Star sx={{ fontSize: '48px', color: '#1c0f42' }} />
                            </Box>
                            <Typography variant="h6" sx={{ color: '#1c0f42', fontWeight: 'bold', marginTop: '10px', height: '100%' }}>
                                Update and sharing
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: '10px', height: '100%' }}>
                                Then make a confirmation and it will put you on the site and of course you can share with anyone you want
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Modal for Login/SignUp */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#ffffff',
                        padding: '40px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        width: '400px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" sx={{ color: '#1c0f42' }}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {!isLogin && (
                            <>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                background: '#1c0f42',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                                padding: '10px',
                                textTransform: 'uppercase',
                                '&:hover': {
                                    background: '#c25c6d',
                                },
                            }}
                        >
                            {isLogin ? 'Log In' : 'SignUp'}
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ marginTop: '20px' }}>
                        {isLogin ? (
                            <span>
                                Not SignUp?{' '}
                                <Button
                                    onClick={() => {
                                        setIsLogin(false);
                                        setError('');
                                    }}
                                    sx={{ color: '#1c0f42' }}
                                >
                                    Sign Up here
                                </Button>
                            </span>
                        ) : (
                            <span>
                                Already have an account?{' '}
                                <Button
                                    onClick={() => {
                                        setIsLogin(true);
                                        setError('');
                                    }}
                                    sx={{ color: '#1c0f42' }}
                                >
                                    Log In here
                                </Button>
                            </span>
                        )}
                    </Typography>
                </Box>
            </Modal>
        </Fragment>
    );
}

export default Login;
