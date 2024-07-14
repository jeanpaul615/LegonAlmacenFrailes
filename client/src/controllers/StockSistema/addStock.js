// Función encargada de agregar un nuevo stock
import Swal from 'sweetalert2'
export const addStock = async (stockData) => {

  try {
    const response = await fetch('http://localhost:5000/stock/add-stocksistema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Nombre_material: stockData.Nombre_material,
        Cantidad: stockData.Cantidad,
        Estado: stockData.Estado  
      })
    });

    if (!response.ok) {
      Swal.fire("Ya existe el material");
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    window.location.reload();
    return data;
  } catch (error) {
    console.error('Error al agregar el stock:', error);
    throw error; 
  }
};
