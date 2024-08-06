import axios from "axios";

// Función encargada de traer los stocks para la datatable del dashboard
export const fetchStocks = async () => {
  try {
    const response = await axios.get('https://legonalmacenfrailes-1.onrender.com/stock/get-stocksistema');
    const filteredResponse = response.data.filter(stock => stock.Cantidad > 0); // Filtrar datos correctos
    console.log(filteredResponse);
    return filteredResponse; // Retorna los datos filtrados
  } catch (error) {
    console.error('Error al obtener los stocks:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};


export const deleteStock = async (id) => {
  const response = await fetch(`https://legonalmacenfrailes-1.onrender.com/delete-stocksistema/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Error deleting stock');
  }
};

export const updateStock = async (Id_stocksistema, Nombre_material, Cantidad, Estado) => {
  // Verifica que todos los parámetros tengan valores definidos
  if (!Id_stocksistema || !Nombre_material || !Cantidad || !Estado) {
    console.error('Valores no definidos para la actualización de stock');
    return;
  }

  try {
    // Obtener el stock actual del material
    const response = await fetch(`https://legonalmacenfrailes-1.onrender.com/stock/update-stocksistema/${Id_stocksistema}/${Nombre_material}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Cantidad, Estado })
    });
    
    if (!response.ok) {
      throw new Error('Error updating stock');
    }

    // No recargar la página aquí; esto debería manejarse desde el componente o función que llama a updateStock
    return response.json(); // Retorna la respuesta JSON si es necesario
  } catch (error) {
    console.error('Error al actualizar el stock:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};
