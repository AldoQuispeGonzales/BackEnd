const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/productoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// Cargar .env solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/productos', productoRoutes);

app.get('/debug/env', (req, res) => {
    res.json({
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT
    });
});

// Swagger activado siempre (solo para pruebas)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Healthcheck
app.get('/', (req, res) => res.send('API Productos OK'));

module.exports = app;