const express = require('express');
const router = express.Router();
const apartadosController = require('../controllers/apartados.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarJWT,apartadosController.index);
router.post('/', authMiddleware.verificarJWT,apartadosController.create);
router.delete('/:id',authMiddleware.verificarJWT, apartadosController.deleteLogico);
router.patch('/:id', authMiddleware.verificarJWT,apartadosController.updateParcial);




module.exports = router;