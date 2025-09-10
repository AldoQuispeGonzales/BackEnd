const express = require('express');
const router = express.Router();
const controller = require('../controllers/productoController');
const { body, param } = require('express-validator');

/**
 * @openapi
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         precio:
 *           type: number
 *           format: double
 *         stock:
 *           type: integer
 *         imagen_url:
 *           type: string
 *         creado_en:
 *           type: string
 *           format: date-time
 *         actualizado_en:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
router.get('/', controller.getAll);

/**
 * @openapi
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener producto por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: No encontrado
 */
router.get('/:id', [param('id').isInt().toInt()], controller.getById);

/**
 * @openapi
 * /api/productos:
 *   post:
 *     summary: Crear un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: integer
 *               imagen_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/',
    [
        body('nombre').isString().notEmpty().withMessage('nombre requerido'),
        body('precio').isNumeric().withMessage('precio debe ser numerico'),
        body('stock').optional().isInt({ min: 0 }).withMessage('stock debe ser entero >= 0'),
        body('imagen_url').optional().isString()
    ],
    controller.create
);

/**
 * @openapi
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id',
    [
        param('id').isInt().toInt(),
        body('nombre').optional().isString(),
        body('precio').optional().isNumeric(),
        body('stock').optional().isInt({ min: 0 }),
        body('imagen_url').optional().isString()
    ],
    controller.update
);

/**
 * @openapi
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', [param('id').isInt().toInt()], controller.remove);

module.exports = router;
