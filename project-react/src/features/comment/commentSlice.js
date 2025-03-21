import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getComment, getCommentById, addComment, deleteComment, updateComment,addCommentForSite,getCommentForSite } from '../../services/commentApi';


const initialState = {
    comments: [],
    loading: false,
    error: '',
};

export const fetchComment = createAsyncThunk('comment/fetchComment', async () => {
    const response = await getComment();
    console.log(response);
    return response; 
});

export const fetchCommentById = createAsyncThunk('comment/fetchCommentById', async (id) => {
    const response = await getCommentById(id);
    console.log(response);
    return response;
});

export const createComment = createAsyncThunk('comment/createComment', async (commentData) => {
    const response = await addComment(commentData);
    return response; 
});

export const removeComment = createAsyncThunk('comment/removeComment', async (id) => {
    await deleteComment(id);
    return id;
});

export const updateCommentById = createAsyncThunk('comment/updateCommentById', async ({id,commentData}) => {
    const response = await updateComment(id,commentData);
    return response.data; 
});

export const fetchCommentForSite = createAsyncThunk('comment/fetchCommentForSite', async () => {
    const response = await getCommentForSite();
    console.log(response);
    return response; 
});

export const createCommentForSite = createAsyncThunk('comment/createCommentForSite', async (commentData) => {
    const response = await addCommentForSite(commentData);
    console.log("response",response);
    return response; 
});



const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(removeComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(updateCommentById.fulfilled, (state, action) => {//לבדוק את זה
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(fetchCommentForSite.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCommentForSite.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addCase(fetchCommentForSite.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(createCommentForSite.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCommentForSite.fulfilled, (state, action) => {
                state.comments.push(action.payload); 
                state.loading = false;
            })
            .addCase(createCommentForSite.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default commentSlice.reducer;