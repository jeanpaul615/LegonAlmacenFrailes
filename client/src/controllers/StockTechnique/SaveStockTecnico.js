import axios from 'axios';
import qs from 'qs'; // Importa el módulo 'qs' para serializar los datos en formato x-www-form-urlencoded

// Función para guardar los datos en la tabla stocktecnico y actualizar stocksistema
export const SaveStockTecnico = async (Id_stocktecnico, Nombre_material, Cantidad, Nombre_tecnico) => {
  try {
    // Crea un objeto con los datos que quieres enviar para guardar en stocktecnico
    const formDataStockTecnico = {
      Id_stocktecnico,
      Nombre_material,
      Cantidad,
      Nombre_tecnico
    };

    // Guardar en stocktecnico usando x-www-form-urlencoded
    const responseStockTecnico = await axios.post('http://3.131.237.43/stocktechnique/add-stocktechnique', qs.stringify(formDataStockTecnico), {
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
    const responseStockSistema = await axios.post('http://3.131.237.43/stock/update-stockbytecnico', qs.stringify(formDataStockSistema), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    window.location.reload();
    return { success: true, responseStockTecnico, responseStockSistema };
  } catch (error) {
    console.error('Error al guardar en stocktecnico o actualizar stocktecnico:', error.message);
    return { success: false, error: error.message };
  }
};
