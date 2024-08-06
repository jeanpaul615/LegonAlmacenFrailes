const mysql = require('mysql');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectTimeout: parseInt(process.env.DB_TIMEOUT, 10) // Convertir el tiempo de espera a número entero
    });

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000); // Reintentar la conexión después de 2 segundos
        } else {
            console.log('Conectado a la base de datos con id', connection.threadId);
        }
    });

    connection.on('error', function(err) {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
            handleDisconnect(); // Reconectar si la conexión se pierde o si ocurre un error fatal
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;
