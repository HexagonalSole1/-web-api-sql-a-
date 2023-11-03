const express = require('express');
const router = express.Router();
const calzadosController = require('../controllers/calzados.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', calzadosController.index);
router.post('/', calzadosController.create);
router.delete('/:id', calzadosController.delete);
router.patch('/:id', calzadosController.updateParcial);




module.exports = router;