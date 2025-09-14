const app = require('./app');

// Cargar .env solo si no se cargó antes
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server corriendo en puerto ${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
    }
});