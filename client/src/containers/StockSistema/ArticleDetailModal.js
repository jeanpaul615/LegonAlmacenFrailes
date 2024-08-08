import React from 'react';
import UploadImage from '../../HandleImages/UploadImage';

function ArticleDetailModal({ isOpen, onClose, article }) {
  if (!isOpen) return null;

  const serverBaseUrl = 'http://3.131.237.43/'; // URL base del servidor

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white mt-48 mb-28 p-5 md:mt-48 rounded-lg shadow-lg max-w-full md:max-w-lg mx-4 sm:mx-auto md:relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Columna 1: Información del Artículo y UploadImage */}
          <div>
            <h2 className="md:flex hidden text-xl font-semibold mb-4">Detalles del Artículo</h2>
            <p className='md:flex hidden'><strong>Id:</strong> {article.Id_stocksistema}</p>
            <p className='md:flex hidden'><strong>Nombre:</strong> {article.Nombre_material}</p>
            <p className='md:flex hidden'><strong>Cantidad:</strong> {article.Cantidad}</p>
            <div className="mt-2">
              <UploadImage nombreMaterialProp={article.Nombre_material} />
            </div>
          </div>

          {/* Columna 2: Imagen del Artículo */}
          <div className="flex justify-center items-center">
            {article.Image_url && (
              <img 
                src={`${serverBaseUrl}${article.Image_url}`} 
                alt="Artículo" 
                className="md:w-full max-w-xs h-40 w-40 md:h-auto border border-gray-300 rounded-lg shadow-sm"
              />
            )}
          </div>
        </div>

        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="md:absolute md:top-2 md:right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ArticleDetailModal;
