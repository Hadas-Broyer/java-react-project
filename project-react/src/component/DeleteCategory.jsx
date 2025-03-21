import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { removeCategory } from "../features/Category/CategorySlice";
import { removeProfessional, fetchProfessionals } from '../features/Professional/ProfessionalSlice';
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

const DeleteCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [professionalsToDelete, setProfessionalsToDelete] = useState([]);
    const [loading, setLoading] = useState(true);


    const professionals = useSelector((state) => state.professionals || []);
    const categories = useSelector((state) => state.categories || []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const result = await dispatch(fetchProfessionals());
                    const professionalData = result.payload;
                    const professionalsInCategory = professionalData.filter(professional => professional.categoryId === parseInt(id));
                    setProfessionalsToDelete(professionalsInCategory);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching professionals:", error);
                    alert("There was a problem bringing in the professionals' information");
                }
            };
            fetchData();
        }
    }, [id, dispatch]);

    const category = id;
    if (!category) {
        return <Typography variant="h6">The category was not found or there is a problem with the data.</Typography>;
    }

    const handleDelete = async () => {
        try {

            for (let professional of professionalsToDelete) {
                const theProfessionalId = professional.theProfessional.id;
                await dispatch(removeProfessional(professional.id));
                await dispatch(removeTheprofessional(theProfessionalId));
            }


            await dispatch(removeCategory(id));

            alert("The category and professionals have been successfully deleted");
            navigate("/HomePage");
        } catch (error) {
            console.error("Error deleting category and professionals:", error);
            alert("There was a problem deleting the category and professionals");
        }
    };

    return (
        <Dialog
            open={true}
            onClose={() => navigate("/HomePage")}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">Delete the category</DialogTitle>
            <DialogContent>
                <Typography variant="body1" id="delete-dialog-description">
                    Do you shur that you want to delete this {category.name} category ?
                </Typography>


                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    The professionals that in this category:
                </Typography>
                {professionalsToDelete.length > 0 ? (
                    <ul>
                        {professionalsToDelete.map(professional => (
                            <li key={professional.id}>{professional.name}</li>
                        ))}
                    </ul>
                ) : (
                    <Typography variant="body2">No professionals in this category</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => navigate("/HomePage")} color="secondary">
                    No
                </Button>
                <Button onClick={handleDelete} color="error">
                    Yes, Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCategory;
