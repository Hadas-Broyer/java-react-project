import axios from 'axios';

export const getTheProfessional = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/theProfessional/getAll'); 
      return response.data;
    } catch (error) {
      console.error("Error fetching theProfessional:", error);
      throw error; 
    }
  }
  
  export const getTheProfessionalById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/theProfessional/getByIdTheProfessional/${id}`); 
      console.log("response.data6666666",response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching theProfessional with id ${id}:`, error);
      throw error;
    }
  }
  
  export const addTheProfessional = async (theProfessionalData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/theProfessional/addTheProfessional', theProfessionalData); 
      return response.data;
    } catch (error) {
      console.error("Error adding theProfessional:", error);
      throw error;
    }
  }
  
  export const deleteTheProfessional = async (id) => {

    try {
      console.log("fff",id);
      const response = await axios.delete(`http://localhost:8080/api/theProfessional/deleteTheProfessionalById/${id}`);
      console.log("jjjj",response.data); 
      return response.data;
    } catch (error) {
      console.error(`Error deleting theProfessional with id ${id}:`, error);
      throw error;
    }
  }
  
  export const updateTheProfessional = async (id, theProfessionalData) => {
    try {
      console.log("Api",id, theProfessionalData);
      const response = await axios.put(`http://localhost:8080/api/theProfessional/updateTheProfessional/${id}`, theProfessionalData);
      console.log("response.dataAAAA",response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating theProfessional with id ${id}:`, error);
      throw error;
    }
  }

  export const login = async ({username, email, password }) => {
    try {
      console.log('Logging api:', {username, email, password });
        const response = await axios.post('http://localhost:8080/api/theProfessional/login', {username, email, password },  
        { headers: { 'Content-Type': 'application/json' }});
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export const signup = async (userData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/theProfessional/signup', userData);
        return response.data; 
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}
  

export const addPicture = async (formData) => {
  try {
      console.log("formData", formData);  // הדפסת FormData לצורך ניפוי בעיות
      const response = await axios.post(`http://localhost:8080/api/theProfessional/addPicture`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data', // חשוב מאוד
          },
      });
      return response.data;  // החזרת התשובה של השרת (המקצוען עם התמונות)
  } catch (error) {
      console.error("Error adding pictures:", error);
      throw error;
  }
};
