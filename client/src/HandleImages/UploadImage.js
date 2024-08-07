import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function UploadImage({ nombreMaterialProp }) {
  const [file, setFile] = useState(null);
  const [nombreMaterial, setNombreMaterial] = useState(nombreMaterialProp);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    setNombreMaterial(nombreMaterialProp); // Actualiza el nombre del material cuando cambie la prop
  }, [nombreMaterialProp]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file || !nombreMaterial) {
      Swal.fire('Por favor, selecciona una imagen y proporciona el nombre del material.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('nombreMaterial', nombreMaterial);

    try {
      const response = await axios.post('http://3.15.96.58/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded:', response.data);
      setUploadSuccess(true);
      setFile(null); // Limpiar archivo después de la carga
      setNombreMaterial(''); // Limpiar nombre del material después de la carga
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Error al subir la imagen. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Subir Imagen</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="nombreMaterial">Nombre del Material:</label>
        <input 
          type="text" 
          id="nombreMaterial"
          placeholder="Nombre del Material" 
          value={nombreMaterial}
          onChange={(e) => setNombreMaterial(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          readOnly // Hacerlo solo lectura si ya viene prellenado
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="fileUpload">Selecciona una Imagen:</label>
        <input 
          type="file" 
          id="fileUpload"
          onChange={onFileChange} 
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button 
        onClick={onUpload} 
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        disabled={isUploading}
      >
        {isUploading ? 'Subiendo...' : 'Subir'}
      </button>
      {uploadSuccess && (
        <p className="text-green-500 mt-4">Imagen subida con éxito.</p>
      )}
      {uploadError && (
        <p className="text-red-500 mt-4">{uploadError}</p>
      )}
    </div>
  );
}

export default UploadImage;
