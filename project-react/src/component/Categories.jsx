import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../features/Category/CategorySlice';
import { useNavigate } from 'react-router-dom';
import { Card, CardOverflow, CardContent, Button, Typography, AspectRatio, Avatar } from '@mui/joy';
import CategoryIcon from '@mui/icons-material/Category';
import Stack from '@mui/joy/Stack';
import Person from '@mui/icons-material/Person';
import Navbar from './Navbar';
import Contact from './contact';



const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const { categories = [], loading, error } = useSelector(state => state.categories || {});

    useEffect(() => {
        if (categories.length == 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleCategoryClick = (id) => {
        navigate(`/category/${id}`);
    };

    const handleAddProfessional = (id) => {
        navigate(`/UploadConect`, { state: { category: { id: id } } });
    };

    function onSearch(event) {
        event.preventDefault();
        console.log("lll", event.target.elements["search-quary"].value);
        const searchQuary = event.target.elements["search-quary"].value;
        setQuery(searchQuary);
        console.log("yyyy", query);
    }


    const filteredCategories = categories.filter((category) => {
        return (category.name.toLowerCase().includes(query.toLowerCase())

        );

    })

    return (
        <div>
            <Navbar />

            <br />
            <form onSubmit={onSearch} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                {/* <label>Search category</label> */}
                <input
                    id="search-query"
                    type="text"
                    placeholder="Search category by name  "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        padding: '10px',
                        marginBottom: '12px',
                        borderRadius: '5px',
                        width: '100%',
                        maxWidth: '450px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        transition: 'border-color 0.3s',
                    }}
                />
                {/* <button type="submit">search</button> */}

            </form>
            <br />
            <h4 className="categories-title" style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: '#1c0f42' }}>Categories</h4>
            <div className="container_cc" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,0.5fr)',
                gap: '55px',
                width: '100%',
                margin: '0 auto',
                padding: '0 20px',
            }}>
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <Card
                            sx={{
                                marginLeft: '50px',
                                marginBottom: '50px',
                                width: '100vw',
                                maxWidth: '45vh',
                                minHeight: '35vh',
                                textAlign: 'center',
                                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0px 15px 30px #1c0f42',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            key={category.id}
                        >
                            <CardOverflow variant="solid" color="neutral">
                                <AspectRatio
                                    variant="outlined"
                                    color="neutral"
                                    ratio="1"
                                    sx={{
                                        m: 'auto',
                                        transform: 'translateY(50%)',
                                        borderRadius: '50%',
                                        width: '60px',
                                        height: '60px',
                                        boxShadow: 'sm',
                                        bgcolor: 'background.surface',
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Avatar sx={{ bgcolor: '#B0B0B0', width: 50, height: 50, margin: '0 auto' }}>
                                            <img
                                                src="לרקעע/Asset-1@2x-300x226.png"
                                                alt="MyBCard Logo"
                                                style={{ height: '40px', marginLeft: '10px' }}
                                            />
                                    </Avatar>
                                </AspectRatio>
                            </CardOverflow>
                            <Typography level="h6" sx={{ mt: 2, fontWeight: 'bold', fontSize: '18px', color: '#333' }}>
                                {category.name}
                            </Typography>
                            <CardContent sx={{ maxWidth: '40ch', flex: 1 }}>
                                <Typography sx={{ fontSize: '14px', color: '#555' }}>
                                    {category.description}
                                </Typography>
                            </CardContent>
                            <CardOverflow sx={{
                                display: 'flex',
                                gap: 1,
                                justifyContent: 'center',
                                paddingBottom: '10px',
                            }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleCategoryClick(category.id)}
                                    sx={{
                                        color: '#1c0f42',
                                        borderColor: '#1c0f42',
                                        padding: '10px 25px',
                                        borderRadius: '30px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#1c0f42',
                                            color: 'white',
                                            borderColor: '#1c0f42',
                                        }
                                    }}
                                >
                                    View Category
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleAddProfessional(category.id)}
                                    sx={{
                                        color: '#1c0f42',
                                        borderColor: '#1c0f42',
                                        padding: '10px 25px',
                                        borderRadius: '30px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#1c0f42',
                                            color: 'white',
                                            borderColor: '#1c0f42',
                                        }
                                    }}
                                >
                                    Add a Professional
                                </Button>
                            </CardOverflow>
                        </Card>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#888' }}>There are no existing categories</p>
                )}
            </div>
            <Contact />
        </div>
    );
};

export default Categories;
