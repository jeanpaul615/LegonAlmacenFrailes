const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const db = require('./src/config/connection'); // Asegúrate de que la ruta es correcta

// Middleware
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
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

    if (results.length > 0) {
      const updateSql = 'UPDATE stocksistema SET Image_url = ? WHERE Nombre_material = ?';
      db.query(updateSql, [imageUrl, nombreMaterial], (err, result) => {
        if (err) {
          console.error('Database update failed:', err);
          return res.status(500).json({ error: 'Database update failed' });
        }
        res.json({ imageUrl, message: 'Image URL updated successfully' });
      });
    } else {
      const insertSql = 'INSERT INTO stocksistema (Image_url, Nombre_material) VALUES (?, ?)';
      db.query(insertSql, [imageUrl, nombreMaterial], (err, result) => {
        if (err) {
          console.error('Database insert failed:', err);
          return res.status(500).json({ error: 'Database insert failed' });
        }
        res.json({ imageUrl, message: 'New record created successfully' });
      });
    }
  });
});

// Configura el servidor para servir archivos estáticos (imágenes)
app.use('/images', express.static('public/images'));

// Importa las rutas
const routesAuth = require('./src/routes/auth/authRoutes');
const routesStock = require('./src/routes/stockRoutes');
const routesStockTechnique = require('./src/routes/stocktechniqueRoutes');
const tecnicoRoutes = require('./src/routes/tecnicoRoutes');
const devolucionRoutes = require('./src/routes/transactions/refundRoutes');
const userRoutes = require('./src/routes/user/userRoutes');
const contratoRoutes = require('./src/routes/agreementRoutes');
const trasladoRoutes = require('./src/routes/transferRoutes');
const devolverRoutes = require('./src/routes/transactions/sendBackRoutes');
const salesRoutes = require('./src/routes/salescheckRoutes');

// Usa las rutas
app.use('/', routesAuth);
app.use('/devolver', devolverRoutes);
app.use('/stock', routesStock);
app.use('/stocktechnique', routesStockTechnique);
app.use('/tecnico', tecnicoRoutes);
app.use('/devolucion', devolucionRoutes);
app.use('/user', userRoutes);
app.use('/contrato', contratoRoutes);
app.use('/traslado', trasladoRoutes);
app.use('/facturas', salesRoutes);

// Exporta la función serverless
module.exports = serverless(app);
