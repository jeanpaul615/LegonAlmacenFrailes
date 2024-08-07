import axios from "axios";

// Función encargada de traer los stocks para la datatable del dashboard
export const fetchContrato = async () => {
  try {
    const response = await axios.get('http://3.15.96.58/contrato/get-contratos');
    return response.data; // Retorna los datos recibidos desde la API
  } catch (error) {
    console.error('Error al obtener los stocks:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};
