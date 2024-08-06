const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const db = require('./src/config/connection');

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Usa express.json() en lugar de bodyParser.urlencoded
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

    db.query(sql, [imageUrl, nombreMaterial], (err) => {
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
const routes = [
  { path: '/', module: './src/routes/auth/authRoutes' },
  { path: '/devolver', module: './src/routes/transactions/sendBackRoutes' },
  { path: '/stock', module: './src/routes/stockRoutes' },
  { path: '/stocktechnique', module: './src/routes/stocktechniqueRoutes' },
  { path: '/tecnico', module: './src/routes/tecnicoRoutes' },
  { path: '/devolucion', module: './src/routes/transactions/refundRoutes' },
  { path: '/user', module: './src/routes/user/userRoutes' },
  { path: '/contrato', module: './src/routes/agreementRoutes' },
  { path: '/traslado', module: './src/routes/transferRoutes' },
  { path: '/facturas', module: './src/routes/salescheckRoutes' }
];

routes.forEach(route => app.use(route.path, require(route.module)));

// Exporta la función serverless
module.exports = serverless(app);
