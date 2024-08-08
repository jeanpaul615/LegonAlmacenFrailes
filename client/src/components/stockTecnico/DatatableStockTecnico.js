import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import { fetchTechniques } from '../../controllers/StockTechnique/Datatable';
import Sidebar from '../../containers/Sidebar';
import ModaltoAdd from './ModaltoAdd';
import { updateStockTechnique } from '../../controllers/Updates/Update';
import ModalUpdate from '../../containers/StockSistema/ModalUpdateStock2';

const columns = [
  { title: 'Id', data: 'Id_stocktecnico' },
  { title: 'Nombre Material', data: 'Nombre_material' },
  { title: 'Nombre Técnico', data: 'Nombre_tecnico' },
  { title: 'Cantidad', data: 'Cantidad' },
  { 
    title: 'Fecha de Modificación', 
    data: 'Fecha_modificacion',
    render: (data) => {
      const dateObject = new Date(data);
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      return formattedDate;
    }
  }
];

const fetchTechniquesFiltered = async () => {
  const techniques = await fetchTechniques();
  return techniques.filter(technique => technique.Cantidad > 0);
};

const TechnicalTable = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
    <>
      <Sidebar />
      <DatatableContainer
        columns={columns}
        fetchData={fetchTechniquesFiltered}
        ModalComponent={ModaltoAdd} // Corregido el nombre de la propiedad a 'ModalComponent'
        TextoButton={"Agregar Material al Stock Técnico"}
        ModalUpdate={ModalUpdate}
        title="STOCK DEL TÉCNICO"
        isAdmin={isAdmin}
        update={updateStockTechnique}
      />
    </>
  );
};

export default TechnicalTable;
