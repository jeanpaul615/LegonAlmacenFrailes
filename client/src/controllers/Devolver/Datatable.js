import axios from "axios";
export const fetchDevolver = async () => {
  try {
    const response = await axios.get(
      "http://3.15.96.58/devolver/get-devolver"
    );
    return response.data; // Retorna los datos recibidos desde la API
  } catch (error) {
    console.error("Error al obtener los datos del stock tecnicos:", error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};

export const AddDevolucion = async (Nombre_material, Cantidad) => {
  try {
    const responseStockSistema = await axios.post(
      "http://3.15.96.58/stock/update-stockbytecnico",
      {
        Nombre_material,
        Cantidad,
      }
    );
    window.location.reload();
    return { success: true, responseStockSistema };
  } catch (error) {
    console.error(
      "Error al guardar en stocktecnico o actualizar stocksistema:",
      error
    );
    return { success: false, error };
  }
};
export const AddDatatable = async (Nombre_material, Cantidad, Estado) => {
  try {
    const response = await axios.post(
      "http://3.15.96.58/devolver/add-devolver",
      {
        Nombre_material,
        Cantidad,
        Estado,
      }
    );
    return response;
  } catch (error) {
    console.error("error al guardar en datatable:", error);
    return { success: false, error };
  }
};
