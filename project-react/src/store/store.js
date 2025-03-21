
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/Category/CategorySlice';
import professionalReducer from '../features/Professional/ProfessionalSlice'
import theprofessionalReducer from '../features/theProfessional/theProfessionalSlice'
import userReducer from '../features/user/userSlice'
import chatReducer from '../features/chat/chatSlice'
import commentReducer from '../features/comment/commentSlice'
import favouritesReducer from '../features/user/favouritesSlice'

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        professional: professionalReducer,
        theprofessional: theprofessionalReducer,
        user: userReducer,
        chat: chatReducer,
        Comments:commentReducer,
        favourites:favouritesReducer,
    },
});
export default store;
