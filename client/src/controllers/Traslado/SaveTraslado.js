import swal from "sweetalert2";
import axios from "axios";
import qs from "qs";

export const SaveTraslado = async (Sede_origen, Sede_destino, Nombre_material, Cantidad) => {
  try {
    // Crear objeto con los datos para guardar en stocktecnico
    const formDataTraslado = {
      Sede_origen,
      Sede_destino,
      Nombre_material,
      Cantidad
    };

    // Guardar en stocktecnico usando x-www-form-urlencoded
    const responseStockTecnico = await axios.post('http://3.131.237.43/traslado/add', qs.stringify(formDataTraslado), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    let responseStockSistema;

    // Lógica condicional para decidir qué API utilizar según la sede de origen
    if (Sede_origen === 'Molivento') {
      // Si la sede_origen es Molivento, usar la API update-stockbydevolucion
      const formDataStockSistema = {
        Nombre_material,
        Cantidad,
        Estado: "Bueno"
      };
      
      responseStockSistema = await axios.post('http://3.131.237.43/stock/update-stockbydevolucion', qs.stringify(formDataStockSistema), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    } else if (Sede_origen === 'Frailes') {
      // Si la sede_origen es Frailes, usar la API update-stockbytecnico
      const formDataStockSistema = {
        Nombre_material,
        Cantidad
      };
  
      responseStockSistema = await axios.post('http://3.131.237.43/stock/update-stockbytecnico', qs.stringify(formDataStockSistema), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }

    // Recargar la página después de completar ambas operaciones (opcional)
    window.location.reload();

    return { success: true, responseStockTecnico, responseStockSistema };
  } catch (error) {
    console.error('Error al guardar en stocktecnico o actualizar stocksistema:', error);
    // Mostrar alerta de error usando SweetAlert2
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al guardar, no hay elementos que trasladar.',
    });
    throw error; // Puedes lanzar el error para manejarlo fuera de la función SaveTraslado si es necesario
  }
};
