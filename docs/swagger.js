const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Productos',
            version: '1.0.0',
            description: 'CRUD de productos - Node.js + Express'
        },
        servers: [
            { url: '/', description: 'Servidor actual' }
        ]
    },
    // usar path.resolve para rutas absolutas
    apis: [path.resolve(__dirname, '../routes/*.js')]
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
