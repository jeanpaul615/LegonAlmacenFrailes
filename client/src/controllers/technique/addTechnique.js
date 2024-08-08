import axios from 'axios';
import qs from 'qs';

export const addTechnician = async (technicianData) => {
  try {
    const response = await axios.post(
      'http://3.131.237.43/tecnico/add-tecnico',
      qs.stringify(technicianData), // Convertir a x-www-form-urlencoded
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error('Error al agregar técnico:', error);
    throw error;
  }
};
