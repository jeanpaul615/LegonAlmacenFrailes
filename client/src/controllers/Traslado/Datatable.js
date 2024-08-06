import axios from "axios";

// Función encargada de traer los stocks para la datatable del dashboard
export const fetchTraslado = async () => {
  try {
    const response = await axios.get('https://legonalmacenfrailes-1.onrender.com/traslado/get-all');
    return response.data; // Retorna los datos recibidos desde la API
  } catch (error) {
    console.error('Error al obtener los traslados:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};
