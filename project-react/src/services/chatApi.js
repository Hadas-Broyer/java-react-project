
import axios from 'axios';

export const getChat = async () => {
    const response = await axios.get('http://localhost:8080/api/chat/getChat');
    return response.data;
};

export const addChat = async (chat) => {
    const response = await axios.post('http://localhost:8080/api/chat/addChat', chat);
    return response.data;
};


export const getChatById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/chat/getChatById/${id}`);
        console.log("gggg",response);
        console.log("kkkkk",response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};
