import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, getUserById, addUser, deleteUser, updateUser, userLogin, userSignup } from '../../services/userApi';

const initialState = {
    user: [],
    loading: false,
    error: '',
};

// פונקציה לקבלת כל המקצוענים
export const fetchUser = createAsyncThunk('user/fetchUser', async () => { 
     console.log("hi");
    const response = await getUser();
    console.log("Response from API:", response);
    return response; 
});

// פונקציה לקבלת מקצוען לפי ID
export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) => {
    const response = await getUserById(id);
    return response.data;
});

// פונקציה להוספת מקצוען
export const createUser = createAsyncThunk('user/createUser', async (userData) => {
    const response = await addUser(userData);
    return response; 
});

// פונקציה למחיקת מקצוען
export const removeUser = createAsyncThunk('user/removeUser', async (id) => {
    await deleteUser(id);
    return id;
});

// פונקציה לעדכון מקצוען
export const updateUserById = createAsyncThunk('user/updateUserById', async ({id, userData}) => {
    const response = await updateUser(id, userData);
    return response.data; 
});

// פונקציה ללוגין
export const loginUser = createAsyncThunk('user/loginUser', async (l) => {
    console.log("lll",l);
    const response = await userLogin(l);
    return response.data; 
});

// פונקציה לסיין-אפ
export const signupUser = createAsyncThunk('user/signupUser', async (userData) => {
    const response = await userSignup(userData);
    return response.data; 
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                console.log("Fetching user...");
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                console.log("Fetching user11111...");
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.user = state.user.filter(user => user.id !== action.payload);
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user.push(action.payload);
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                const index = state.user.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.user[index] = action.payload;
                }
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                 console.log("action.payload",action.meta.arg);
                state.currentUser = action.meta.arg;
                 localStorage.setItem('user',JSON.stringify(state.currentUser))

            })
            .addCase(signupUser.fulfilled, (state, action) => {
                console.log("action.payload",action.meta.arg);
                state.currentUser = action.meta.arg;
                 localStorage.setItem('user',JSON.stringify(state.currentUser))
            });
    },
});

export default userSlice.reducer;
