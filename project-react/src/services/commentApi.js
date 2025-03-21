import axios from 'axios';

export const getComment = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/commentController/getComment'); 
      return response.data;
    } catch (error) {
      console.error("Error fetching comment:", error);
      throw error; 
    }
  }

  export const getCommentById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/commentController/getCommentById/${id}`);
        console.log("gggg",response);
        console.log("kkkkk",response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};
  
  export const addComment = async (commentData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/commentController/addComment', commentData); 
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }
  
  export const deleteComment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/commentController/deleteComment/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting comment with id ${id}:`, error);
      throw error;
    }
  }
  
  export const updateComment = async (id, commentData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/commentController/updateComment/${id}`,commentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating comment with id ${id}:`, error);
      throw error;
    }
  }

  export const addCommentForSite = async (commentData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/commentController/addCommentForSite', commentData); 
      return response.data;
    } catch (error) {
      console.error("Error adding commentForSite:", error);
      throw error;
    }
  }

  export const getCommentForSite = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/commentController/getCommentsForSite'); 
      return response.data;
    } catch (error) {
      console.error("Error fetching commentForSite:", error);
      throw error; 
    }
  }
