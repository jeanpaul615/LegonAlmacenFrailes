import axios from "axios";
import qs from 'qs';
import swal from 'sweetalert2'; // Importa SweetAlert2

export const getMaterials = async (Nombre_tecnico) => {
  try {
    const response = await fetch('http://3.131.237.43/stocktechnique/materials-by-tecnico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Nombre_tecnico }) // Asegúrate de que esto coincide con lo que espera el backend
    });
    const data = await response.json();
    return data; // Asegúrate de que los datos devueltos están en el formato esperado
  } catch (error) {
    console.error('Error al obtener los materiales:', error);
    throw error;
  }
};


// Función para obtener la lista de técnicos
export const getTechnicians = async () => {
  try {
    const response = await fetch('http://3.131.237.43/stocktechnique/all-tecnicos');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Asume que la respuesta es una lista de nombres de técnicos
  } catch (error) {
    console.error('Error al obtener técnicos:', error);
    throw error;
  }
};

// Función para obtener el stock por material en formato application/json
export const getStockByMaterial = async (Nombre_material, Nombre_tecnico) => {
  try {
    const response = await fetch('http://3.131.237.43/stocktechnique/stock-by-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Nombre_material, Nombre_tecnico })
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el stock por material:', error);
    throw error;
  }
};

// Función para guardar el stock técnico
export const SaveStockTecnico = async (Nombre_material, Cantidad, Nombre_tecnico) => {
  try {
    // Crea un objeto con los datos que quieres enviar para guardar en stocktecnico
    const formDataStockTecnico = {
      Nombre_material,
      Nombre_tecnico,
      Cantidad
    };

    // Guardar en stocktecnico usando x-www-form-urlencoded
    const responseStockTecnico = await axios.put('http://3.131.237.43/stocktechnique/update-cantidad-stocktechnique', qs.stringify(formDataStockTecnico), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Crea un objeto con los datos que quieres enviar para actualizar en stocksistema
    const formDataStockSistema = {
      Nombre_material,
      Cantidad
    };

    // Actualizar stocksistema usando x-www-form-urlencoded
    const responseStockSistema = await axios.post('http://3.131.237.43/stock/update-stockbydevolucion', qs.stringify(formDataStockSistema), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Recargar la página después de completar ambas operaciones
    window.location.reload();

    return { success: true, responseStockTecnico, responseStockSistema };
  } catch (error) {
    console.error('Error al guardar en stocktecnico o actualizar stocksistema:', error);
    // Utiliza SweetAlert2 para mostrar una alerta de error
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al guardar, no hay elementos que trasladar.',
    });
  }
};
