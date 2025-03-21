import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavourites, getFavouritesById, addFavourites, deleteFavourites, updateFavourites } from '../../services/favouritesApi';


const initialState = {
    favourites: [],
    loading: false,
    error: '',
};


export const fetchFavourites = createAsyncThunk('favourites/fetchFavourites', async () => {
    const response = await getFavourites(); 
       console.log("response",response);

    return response; 
});


export const fetchFavouritesById = createAsyncThunk('favourites/fetchCategoryById', async (id) => {
    const response = await getFavouritesById(id);
    return response.data;
});


export const createFavourites = createAsyncThunk('favourites/createFavourites', async (favouritesData) => {
    console.log("favouritesData",favouritesData);
    const response = await addFavourites(favouritesData);
    console.log("responseresponse",response);
    return response; 
});


export const removeFavourites = createAsyncThunk('favourites/removeFavourites', async (id) => {
    await deleteFavourites(id);
    return id;
});


export const updateFavouritesById = createAsyncThunk('favourites/updateFavouritesById', async ({id,favouritesData}) => {
    console.log("id",int(id.id));
    const response = await updateFavourites(id,favouritesData);
    console.log("response.data",response.data);
    return response.data; 
});

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.favourites = action.payload;
                state.loading = false;
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(removeFavourites.fulfilled, (state, action) => {
                state.favourites = state.favourites.filter(f => f.id !== action.payload);
            })
            .addCase(createFavourites.fulfilled, (state, action) => {
                state.favourites.push(action.payload);
            })
            .addCase(updateFavouritesById.fulfilled, (state, action) => {//לבדוק את זה
                const index = state.favourites.findIndex(f => f.id === action.payload.id);
                if (index !== -1) {
                    state.favourites[index] = action.payload;
                }
            })
            ;
    },
});

export default favouritesSlice.reducer;
