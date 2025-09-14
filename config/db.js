const { Pool } = require('pg');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// Claves esperadas
const requiredKeys = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

// Función para extraer el valor desde un JSON string
function extractValue(raw, key) {
    if (!raw) {
        console.error(`[SecretsManager] ❌ Variable ${key} no está definida en process.env`);
        process.exit(1);
    }

    try {
        const parsed = JSON.parse(raw);
        if (!parsed.hasOwnProperty(key)) {
            console.error(`[SecretsManager] ❌ Clave "${key}" no encontrada en el secreto. Se recibió: ${JSON.stringify(parsed)}`);
            process.exit(1);
        }
        return parsed[key];
    } catch (err) {
        console.error(`[SecretsManager] ❌ Error al parsear ${key}: ${err.message}`);
        process.exit(1);
    }
}

// Extraer y validar todas las variables
const config = {};
requiredKeys.forEach((key) => {
    config[key] = extractValue(process.env[key], key);
});

// Crear el pool de conexión
const pool = new Pool({
    host: config.DB_HOST,
    port: Number(config.DB_PORT) || 5432,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;