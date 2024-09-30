const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas protegidas
router.get('/', authMiddleware.protect, usuarioController.getAllUsuarios);
router.get('/:id', authMiddleware.protect, usuarioController.getUsuarioById);
router.post('/', authMiddleware.protect, usuarioController.createUsuario);
router.put('/:id', authMiddleware.protect, usuarioController.updateUsuario);
router.delete('/:id', authMiddleware.protect, usuarioController.deleteUsuario);

module.exports = router;
