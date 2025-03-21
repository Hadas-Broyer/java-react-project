import axios from 'axios';



export const getCategory = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/category/getAllCategory'); 
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; 
  }
}

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/category/getCategoryById/${id}`); 
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }
}

export const addCategory = async (categoryData) => {
  try {
    console.log("categoryData",categoryData);
    const response = await axios.post('http://localhost:8080/api/category/addCategory', categoryData); 
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/category/deleteCategoryById/${id}`); 
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
}

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/category/updateCategory/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error;
  }
}
