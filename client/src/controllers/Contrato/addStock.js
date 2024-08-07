import axios from "axios";
// Función encargada de obtener materiales por técnico
export const getMaterials = async (Nombre_tecnico) => {
  try {
    const response = await fetch('hhttp://3.15.96.58/stocktechnique/materials-by-tecnico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Nombre_tecnico })
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los materiales:', error);
    throw error;
  }
};

// Función para obtener la lista de técnicos
export const getTechnicians = async () => {
  try {
    const response = await fetch('hhttp://3.15.96.58/stocktechnique/all-tecnicos');
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
    const response = await fetch('hhttp://3.15.96.58/stocktechnique/stock-by-name', {
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
    console.log(data);
    return data.cantidad;
  } catch (error) {
    console.error('Error al obtener el stock por material:', error);
    throw error;
  }
};
// Función para enviar un contrato
export const submitContrato = async (Nombre_contrato, Nombre_material, Nombre_tecnico, Cantidad, onClose) => {
  try {
    const response = await axios.post('hhttp://3.15.96.58/contrato/add-contratos', {
      Nombre_contrato,
      Nombre_tecnico,
      Nombre_material,
      Cantidad,
    });
    console.log('Contrato agregado:', response.data);

    const response2 = await axios.put('hhttp://3.15.96.58/stocktechnique/update-cantidad-stocktechnique', {
      Nombre_material,
      Nombre_tecnico,
      Cantidad,
    });
    console.log('Stock actualizado:', response2.data);
    window.location.reload();   
  } catch (error) {
    console.error('Error al agregar contrato:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};
