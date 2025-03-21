import axios from 'axios';

export const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/getUsers'); 
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error; 
    }
  }
  
  export const getUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/getuserbyid/${id}`); 
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  }
  
  export const addUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/addusers', userData); 
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }
  
  export const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/users/deleteusers/${id}`); 
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
  
  export const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/updateusers/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  }
  

  export const userLogin = async (l) => {
    try {
      console.log("llkkll",l);
        const response = await axios.post('http://localhost:8080/api/users/login', l);
        console.log(" response.data", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export const userSignup = async (userData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/users/signup', userData);
        return response.data; 
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}


