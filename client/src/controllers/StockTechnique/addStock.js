import Swal from 'sweetalert2';

// Función encargada de agregar un nuevo stock
export const addStock = async (stockData) => {
  try {
    const response = await fetch('https://legonalmacenfrailes-1.onrender.com/add-stocksistema', {
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
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    // Si el material ya existe, mostrar mensaje con SweetAlert2
    if (data.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe el material',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Material agregado exitosamente',
    });

    window.location.reload();
    return data;
  } catch (error) {
    console.error('Error al agregar el stock:', error);
    throw error;
  }
};

// Función para obtener la lista de técnicos
export const getTechnicians = async () => {
  try {
    const response = await fetch('https://legonalmacenfrailes-1.onrender.com/tecnico/tecnicos');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json(); // Corregido para obtener datos JSON
    return data; // Asume que la respuesta es una lista de nombres de técnicos
  } catch (error) {
    console.error('Error al obtener técnicos:', error);
    throw error;
  }
};

// Función para obtener la lista de materiales
export const getMaterials = async () => {
  try {
    const response = await fetch('https://legonalmacenfrailes-1.onrender.com/stock/get-stocksistema');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json(); // Corregido para obtener datos JSON
    return data; // Asume que la respuesta es una lista de nombres de materiales
  } catch (error) {
    console.error('Error al obtener materiales:', error);
    throw error;
  }
};

// Función para obtener el stock por material en formato application/json
// Función para obtener el stock por material en formato application/json
export const getStockByMaterial = async (Nombre_material) => {
  try {
    const response = await fetch('https://legonalmacenfrailes-1.onrender.com/stock/byname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Nombre_material }) // Convertir el cuerpo de la solicitud a JSON
    });

    if (!response.ok) {
      throw new Error('Error al obtener el stock por material');
    }

    const data = await response.json();

    // Asegúrate de que el data contenga la propiedad cantidad
    if (!data || typeof data.cantidad !== 'number') {
      throw new Error('Material no encontrado');
    }

    return data.cantidad; // Devolver solo la cantidad
  } catch (error) {
    console.error('Error al obtener el stock por material:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};