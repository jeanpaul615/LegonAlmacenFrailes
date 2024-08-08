// isAdmin.js
import axios from "axios";

export const ApisAdmin = async (username) => {
  try {
    const response = await axios.post('http://3.131.237.43/check-admin', {
      username: username
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Assuming response.data.isAdmin is either 0 or 1
    if(response.data.isAdmin === 1)
      return true;
    else
      return false;
  } catch (error) {
    console.error('Error al obtener los datos del stock tecnicos:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};
