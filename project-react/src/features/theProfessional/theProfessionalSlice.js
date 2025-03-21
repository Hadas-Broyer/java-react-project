import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {addPicture,getTheProfessional, getTheProfessionalById, addTheProfessional, deleteTheProfessional, updateTheProfessional, login, signup } from '../../services/theProfessionalApi';

const initialState = {
    theprofessional: [],
    loading: false,
    error: '',
};

export const addProfessionalPicture = createAsyncThunk('theprofessional/addProfessionalPicture', async (formData) => {
    console.log("Sending FormData:", formData);  
    const response = await addPicture(formData); 
    return response;
});

// פונקציה לקבלת כל המקצוענים
export const fetchTheprofessional = createAsyncThunk('theprofessional/fetchTheprofessional', async () => {
    const response = await getTheProfessional();
    return response; 
});

// פונקציה לקבלת מקצוען לפי ID
export const fetchTheprofessionalById = createAsyncThunk('theprofessional/fetchTheprofessionalById', async (id) => {
    const response = await getTheProfessionalById(id);
    console.log("responseeeeeeee",response);
    return response;
});

// פונקציה להוספת מקצוען
export const createTheprofessional = createAsyncThunk('theprofessional/createTheprofessional', async (professionalData) => {
    const response = await addTheProfessional(professionalData);
    return response; 
});

// פונקציה למחיקת מקצוען
export const removeTheprofessional = createAsyncThunk('theprofessional/removeTheprofessional', async (id) => {
    console.log("idpppp",id);
    await deleteTheProfessional(id);
    
    return id;
});

// פונקציה לעדכון מקצוען
export const updateTheprofessionalById = createAsyncThunk('theprofessional/updateTheprofessionalById', async ({id, professionalData}) => {
    console.log("professionalDataSlise",{id,professionalData});
    const response = await updateTheProfessional(id, professionalData);
    console.log("responsessss",response);
    return response; 
});

// פונקציה ללוגין
export const loginUser = createAsyncThunk('theprofessional/login', async ({username, email, password }) => {
    console.log('Logging in with:', {username, email, password });
    const response = await login({username, email, password });
    console.log("response",response);
    return response; 
});

// פונקציה לסיין-אפ
export const signupUser = createAsyncThunk('theprofessional/signup', async (userData) => {
    const response = await signup(userData);
    return response.data; 
});

const theprofessionalSlice = createSlice({
    name: 'theprofessional',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTheprofessional.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTheprofessional.fulfilled, (state, action) => {
                state.theprofessional = action.payload;
                state.loading = false;
            })
            .addCase(fetchTheprofessional.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(removeTheprofessional.fulfilled, (state, action) => {
                state.theprofessional = state.theprofessional.filter(theprofessional => theprofessional.id !== action.payload);
            })
            .addCase(createTheprofessional.fulfilled, (state, action) => {
                state.theprofessional.push(action.payload);
            })
            .addCase(updateTheprofessionalById.fulfilled, (state, action) => {
                const index = state.theprofessional.findIndex(theprofessional => theprofessional.id === action.payload.id);
                if (index !== -1) {
                    state.theprofessional[index] = action.payload;
                }
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // לדוגמה, אפשר לאחסן את הפרטים של המשתמש
                state.currentUser = action.payload;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                // ניתן לבצע פעולות נוספות לאחר סיום הסיוני
            })
            .addCase(addProfessionalPicture.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProfessionalPicture.fulfilled, (state, action) => {
                const index = state.theprofessional.findIndex(theprofessional => theprofessional.id === action.payload.id);
                if (index !== -1) {
                    state.theprofessional[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(addProfessionalPicture.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default theprofessionalSlice.reducer;
