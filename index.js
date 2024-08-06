const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const db = require('./src/config/connection');

// Middleware
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json()); // El uso de express.json() es suficiente para el cuerpo JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de Multer para almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Ruta para cargar imágenes y actualizar o insertar en la base de datos
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `/images/${req.file.filename}`;
  const nombreMaterial = req.body.nombreMaterial;

  const checkSql = 'SELECT * FROM stocksistema WHERE Nombre_material = ?';
  db.query(checkSql, [nombreMaterial], (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    const sql = results.length > 0
      ? 'UPDATE stocksistema SET Image_url = ? WHERE Nombre_material = ?'
      : 'INSERT INTO stocksistema (Image_url, Nombre_material) VALUES (?, ?)';

    const params = results.length > 0
      ? [imageUrl, nombreMaterial]
      : [imageUrl, nombreMaterial];

    db.query(sql, params, (err) => {
      if (err) {
        console.error(results.length > 0 ? 'Database update failed:' : 'Database insert failed:', err);
        return res.status(500).json({ error: results.length > 0 ? 'Database update failed' : 'Database insert failed' });
      }

      res.json({ imageUrl, message: results.length > 0 ? 'Image URL updated successfully' : 'New record created successfully' });
    });
  });
});

// Configura el servidor para servir archivos estáticos (imágenes)
app.use('/images', express.static('public/images'));

// Importa y usa las rutas
const routes = {
  '/': './src/routes/auth/authRoutes',
  '/devolver': './src/routes/transactions/sendBackRoutes',
  '/stock': './src/routes/stockRoutes',
  '/stocktechnique': './src/routes/stocktechniqueRoutes',
  '/tecnico': './src/routes/tecnicoRoutes',
  '/devolucion': './src/routes/transactions/refundRoutes',
  '/user': './src/routes/user/userRoutes',
  '/contrato': './src/routes/agreementRoutes',
  '/traslado': './src/routes/transferRoutes',
  '/facturas': './src/routes/salescheckRoutes'
};

for (const [route, path] of Object.entries(routes)) {
  app.use(route, require(path));
}

// Exporta la función serverless
module.exports.handler = serverless(app);
