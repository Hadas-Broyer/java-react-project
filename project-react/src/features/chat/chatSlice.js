// src/features/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChat ,addChat,getChatById} from '../../services/chatApi';

export const fetchChats = createAsyncThunk('chat/fetchChats', async () => {
    return await getChat();
});

export const  fetAddChat = createAsyncThunk('chat/addChat', async (chat) => {
    const response = await addChat(chat);
    return response;
});

export const fetchChatById = createAsyncThunk('chat/fetchChatById', async (id) => {
    const response = await getChatById(id);
    console.log("response",response);
    return response;
});

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        loading: false,
        error: null,
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetAddChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetAddChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chats.push(action.payload); // הוספת ההודעה החדשה
            })
            .addCase(fetAddChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setChats } = chatSlice.actions;
export default chatSlice.reducer;
