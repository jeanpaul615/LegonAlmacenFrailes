const db = require('../../config/connection');

const Tecnico = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tecnicos', (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tecnicos WHERE Id_tecnico = ?', [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  },

  addTechnician: (technicianData, callback) => {
    const query = `INSERT INTO tecnicos (Cedula, Nombre, Telefonos, Fecha_licencia, Vencimiento_licencia, Cargo, Estado, Fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [
      technicianData.Cedula,
      technicianData.Nombre,
      technicianData.Telefonos,
      technicianData.Fecha_licencia,
      technicianData.Vencimiento_licencia,
      technicianData.Cargo,
      technicianData.Estado,
      technicianData.Fecha_creacion
    ], (err, result) => {
      if (err) {
        console.error('Error al insertar técnico:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Técnico agregado correctamente', insertId: result.insertId });
    });
  },

  update: (updatedTecnico) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE tecnicos
        SET Cedula = ?, Nombre = ?, Telefonos = ?, Fecha_licencia = ?, Vencimiento_licencia = ?, Cargo = ?, Estado = ?, Fecha_modificacion = CURRENT_TIMESTAMP 
        WHERE Id_tecnico = ?
      `;
      const {
        Id_tecnico,
        Cedula,
        Nombre,
        Telefonos,
        Fecha_licencia,
        Vencimiento_licencia,
        Cargo,
        Estado
      } = updatedTecnico;
      db.query(query, [Cedula, Nombre, Telefonos, Fecha_licencia, Vencimiento_licencia, Cargo, Estado, Id_tecnico], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: 'Tecnico updated', affectedRows: results.affectedRows });
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tecnicos WHERE Id_tecnico = ?', [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: 'Tecnico deleted', affectedRows: results.affectedRows });
      });
    });
  }
};

module.exports = Tecnico;
