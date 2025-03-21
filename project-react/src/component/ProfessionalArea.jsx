import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Box, Typography, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from "./Navbar";

function ProfessionalArea() {
    const { id } = useParams();
    const navigate = useNavigate();

    console.log("id", id);

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100vh",
                    backgroundColor: "#f4f4f4",
                    padding: "20px"
                }}
            >
                {/* כותרת */}
                <Typography variant="h4" sx={{ marginBottom: "30px" }}>
                    ברוך הבא לאזור בעל המקצוע
                </Typography>

                {/* כפתורים מעוגלים */}
                <Box sx={{ display: "flex", gap: 4 }}>
                    {/* כפתור עדכון */}
                    <Paper
                        sx={{
                            backgroundColor: "#1976d2",
                            padding: "20px",
                            borderRadius: "50%",
                            boxShadow: 3,
                            cursor: "pointer",
                            '&:hover': {
                                backgroundColor: "#1565c0",
                                transform: "scale(1.1)",
                            },
                            transition: "transform 0.3s, background-color 0.3s",
                        }}
                    >
                        <IconButton
                            onClick={() => navigate(`/updateProfessional/${id}`)}
                            sx={{ color: "#fff" }}
                        >
                            <EditIcon fontSize="large" />
                        </IconButton>
                    </Paper>

                    {/* כפתור מחיקה */}
                    <Paper
                        sx={{
                            backgroundColor: "#d32f2f",
                            padding: "20px",
                            borderRadius: "50%",
                            boxShadow: 3,
                            cursor: "pointer",
                            '&:hover': {
                                backgroundColor: "#c62828",
                                transform: "scale(1.1)",
                            },
                            transition: "transform 0.3s, background-color 0.3s",
                        }}
                    >
                        <IconButton
                            onClick={() => navigate(`/DeleteProfessional/${id}`)}
                            sx={{ color: "#fff" }}
                        >
                            <DeleteIcon fontSize="large" />
                        </IconButton>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}

export default ProfessionalArea;
