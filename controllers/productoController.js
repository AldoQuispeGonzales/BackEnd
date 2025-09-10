const Producto = require('../models/productoModel');
const { validationResult } = require('express-validator');

const productoController = {
    async getAll(req, res) {
        try {
            const productos = await Producto.findAll();
            return res.json(productos);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.findById(id);
            if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
            return res.json(producto);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener el producto' });
        }
    },

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const { nombre, descripcion, precio, stock, imagen_url } = req.body;
            const nuevo = await Producto.create({ nombre, descripcion, precio, stock, imagen_url });
            return res.status(201).json(nuevo);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al crear el producto' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const exist = await Producto.findById(id);
            if (!exist) return res.status(404).json({ error: 'Producto no encontrado' });

            const { nombre, descripcion, precio, stock, imagen_url } = req.body;
            const actualizado = await Producto.update(id, { nombre, descripcion, precio, stock, imagen_url });
            return res.json(actualizado);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },

    async remove(req, res) {
        try {
            const { id } = req.params;
            const exist = await Producto.findById(id);
            if (!exist) return res.status(404).json({ error: 'Producto no encontrado' });
            await Producto.remove(id);
            return res.json({ message: 'Producto eliminado' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }
};

module.exports = productoController;
