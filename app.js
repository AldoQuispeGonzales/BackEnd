const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productoRoutes = require('./routes/productoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productoRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Healthcheck
app.get('/', (req, res) => res.send('API Productos OK'));

module.exports = app;
