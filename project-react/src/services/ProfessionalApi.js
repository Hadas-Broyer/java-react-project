import axios from 'axios';

export const getProfessional = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/professionals/getAllProfessionals'); 
      console.log("Fetched professionals:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Professional:", error);
      throw error; 
    }
  }
  
  export const getProfessionalById = async (id) => {
    try {
      console.log(id);
      const response = await axios.get(`http://localhost:8080/api/professionals/getProfessionalsById/${id}`); 
      console.log("oooooooo",id);
      return response.data;
    } catch (error) {
      console.error(`Error fetching professional with id ${id}:`, error);
      throw error;
    }
  }
  
  export const addProfessional = async (professionalData) => {
    try {
      console.log(professionalData);
      const response = await axios.post('http://localhost:8080/api/professionals/addProfessionals', professionalData); 
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding professional:", error);
      throw error;
    }
  }
  
  export const deleteProfessional = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/professionals/deleteProfessionalsById/${id}`); 
      return response.data;
    } catch (error) {
      console.error(`Error deleting professional with id ${id}:`, error);
      throw error;
    }
  }
  
  export const updateProfessional = async (id, professionalData) => {
    try {
      console.log("id, professionalData",id, professionalData);
      const response = await axios.put(`http://localhost:8080/api/professionals/updateProfessionals/${id}`, professionalData);
      console.log("response",response);
      console.log("response.data",response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating professional with id ${id}:`, error);
      throw error;
    }
  }


  

