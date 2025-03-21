import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { removeProfessional, fetchProfessionalById } from '../features/Professional/ProfessionalSlice';
import { removeTheprofessional } from '../features/theProfessional/theProfessionalSlice';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Box,
    CircularProgress
} from '@mui/material';

function DeleteProfessional() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [professional, setProfessional] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const result = await dispatch(fetchProfessionalById(id));
                    const professionalData = result.payload;
                    setProfessional(professionalData);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching professional:", error);
                    alert("There was a problem fetching the professional's information ");
                }
            };
            fetchData();
        }
    }, [id, dispatch]);

    const theProfessionalId = professional ? professional.theProfessional.id : null;

    const handleDelete = async () => {
        try {
            await dispatch(removeProfessional(id));
            await dispatch(removeTheprofessional(theProfessionalId));
            alert("The professional has been successfully deleted");
            navigate("/HomePage");
        } catch (error) {
            console.error("Error deleting professional:", error);
            alert("There was a problem deleting the professional");
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Dialog
                    open={true}
                    onClose={() => navigate("/HomePage")}
                    aria-labelledby="delete-dialog-title"
                    aria-describedby="delete-dialog-description"
                >
                    <DialogTitle id="delete-dialog-title">Delete professional</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" id="delete-dialog-description">
                            Are you sure you want to delete the professional {professional.name}?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => navigate("/HomePage")} color="secondary">
                            No
                        </Button>
                        <Button onClick={handleDelete} color="error">
                            Yes , delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default DeleteProfessional;
