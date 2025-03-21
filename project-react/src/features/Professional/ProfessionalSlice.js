import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfessional, getProfessionalById, addProfessional, deleteProfessional, updateProfessional } from '../../services/ProfessionalApi';


const initialState = {
    professional: [],
    loading: false,
    error: '',
};


export const fetchProfessionals = createAsyncThunk('professionals/fetchProfessionals', async () => {
    console.log("ddd");
    const response = await getProfessional();
    console.log("Fetched professionals:", response)
    return response; //data
});


export const fetchProfessionalById = createAsyncThunk('professionals/fetchProfessionalById', async (id) => {
    console.log("kkkkkkkkkkklllllllllll",id);
    const response = await getProfessionalById(id);
    console.log("ppppppppppp",response);
    return response;
});


export const createProfessional = createAsyncThunk('professionals/createProfessional', async (professionalData) => {
    console.log(professionalData);
    const response = await addProfessional(professionalData);
   
    return response.data; 
});

// פונקציה למחיקת קטגוריה
//זה רימוב כדי שלא יהיה באותו שם
export const removeProfessional = createAsyncThunk('professionals/removeProfessional', async (id) => {
    await deleteProfessional(id);
    return id;
});

// פונקציה לעדכון קטגוריה
export const updateProfessionalById = createAsyncThunk('professionals/updateProfessionalById', async ({id,professionalData}) => {
    console.log("{id,professionalData}",{id,professionalData});
    const response = await updateProfessional(id,professionalData);
    console.log("responseresponse",response);
    return response; 
});


const professionalSlice = createSlice({
    name: 'professional',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfessionals.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfessionals.fulfilled, (state, action) => {
                console.log("action.payload22",action.payload);
                state.professional = action.payload;
                localStorage.setItem('tneProfessional',JSON.stringify(state.professional))
                state.loading = false;
            })
            .addCase(fetchProfessionals.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(removeProfessional.fulfilled, (state, action) => {
                state.professional = state.professional.filter(professional => professional.id !== action.payload);
            })
            .addCase(createProfessional.fulfilled, (state, action) => {
                state.professional.push(action.payload);
            })
            .addCase(updateProfessionalById.fulfilled, (state, action) => {//לבדוק את זה
                const index = state.professional.findIndex(professional => professional.id === action.payload.id);
                if (index !== -1) {
                    state.professional[index] = action.payload;
                }
            });
            
            
    },
});

export default professionalSlice.reducer;
