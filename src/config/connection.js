const mysql = require('mysql');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

let pool;

function handleDisconnect() {
    pool = mysql.createPool({
        connectionLimit: 10, // Número máximo de conexiones en el pool
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectTimeout: parseInt(process.env.DB_TIMEOUT, 10) // Convertir el tiempo de espera a número entero
    });

    pool.on('connection', function (connection) {
        console.log('Nueva conexión en el pool con id:', connection.threadId);
    });

    pool.on('error', function (err) {
        console.error('Error en el pool de conexiones:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
            // Manejar el error y reiniciar el pool si es necesario
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = {
    query: function (sql, values, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error('Error al obtener una conexión del pool:', err);
                return callback(err, null);
            }
            connection.query(sql, values, function (error, results, fields) {
                connection.release(); // Liberar la conexión de vuelta al pool
                if (error) {
                    console.error('Error en la consulta:', error);
                }
                callback(error, results, fields);
            });
        });
    }
};
