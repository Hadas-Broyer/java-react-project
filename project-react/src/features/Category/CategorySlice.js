import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategory, getCategoryById, addCategory, deleteCategory, updateCategory } from '../../services/CatecoryApi';


const initialState = {
    categories: [],
    loading: false,
    error: '',
};


export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await getCategory();
    return response; 
});


export const fetchCategoryById = createAsyncThunk('categories/fetchCategoryById', async (id) => {
    console.log("id",id);
    const response = await getCategoryById(id);
    console.log("response.data",response);
    return response;
});


export const createCategory = createAsyncThunk('categories/createCategory', async (categoryData) => {
    return await addCategory(categoryData);
  
});


export const removeCategory = createAsyncThunk('categories/removeCategory', async (id) => {
    await deleteCategory(id);
    return id;
});


export const updateCategoryById = createAsyncThunk('categories/updateCategoryById', async ({id,categoryData}) => {
    console.log("id",int(id.id));
    const response = await updateCategory(id,categoryData);
    console.log("response.data",response.data);
    return response.data; 
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                // localStorage.setItem('category',JSON.stringify(state.categories));
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(category => category.id !== action.payload);
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(updateCategoryById.fulfilled, (state, action) => {//לבדוק את זה
                const index = state.categories.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            });
    },
});

export default categorySlice.reducer;
