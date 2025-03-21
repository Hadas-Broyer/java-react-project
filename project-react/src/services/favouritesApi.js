import axios from 'axios';



export const getFavourites = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/favouritesController/getAllFavourites'); 
    return response.data;
  } catch (error) {
    console.error("Error fetching favourites:", error);
    throw error; 
  }
}

export const getFavouritesById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/category/getCategoryById/${id}`); 
    return response.data;
  } catch (error) {
    console.error(`Error fetching favourites with id ${id}:`, error);
    throw error;
  }
}

export const addFavourites = async (favouritesData) => {
  try {
    console.log("favouritesDatafavouritesData",favouritesData);
    const response = await axios.post('http://localhost:8080/api/favouritesController/addFavourites', favouritesData); 
    console.log("response",response);
    return response.data;
  } catch (error) {
    console.error("Error adding favourites:", error);
    throw error;
  }
}

export const deleteFavourites = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/category/deleteCategoryById/${id}`); 
    return response.data;
  } catch (error) {
    console.error(`Error deleting favourites with id ${id}:`, error);
    throw error;
  }
}

export const updateFavourites = async (id, favouritesData) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/category/updateCategory/${id}`, favouritesData);
    return response.data;
  } catch (error) {
    console.error(`Error updating favourites with id ${id}:`, error);
    throw error;
  }
}
