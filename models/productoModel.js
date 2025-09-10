const pool = require('../config/db');

const Producto = {
    async findAll() {
        const res = await pool.query('SELECT * FROM productos ORDER BY id');
        return res.rows;
    },

    async findById(id) {
        const res = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        return res.rows[0];
    },

    async create({ nombre, descripcion, precio, stock, imagen_url }) {
        const res = await pool.query(
            `INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url)
             VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
            [nombre, descripcion, precio, stock, imagen_url]
        );
        return res.rows[0];
    },

    async update(id, { nombre, descripcion, precio, stock, imagen_url }) {
        const res = await pool.query(
            `UPDATE productos SET
                nombre = COALESCE($1, nombre),
                descripcion = COALESCE($2, descripcion),
                precio = COALESCE($3, precio),
                stock = COALESCE($4, stock),
                imagen_url = COALESCE($5, imagen_url),
                actualizado_en = CURRENT_TIMESTAMP
             WHERE id = $6
                 RETURNING *`,
            [nombre, descripcion, precio, stock, imagen_url, id]
        );
        return res.rows[0];
    },

    async remove(id) {
        const res = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }
};

module.exports = Producto;
