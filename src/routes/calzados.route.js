const express = require('express');
const router = express.Router();
const calzadosController = require('../controllers/calzados.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/',authMiddleware.verificarJWT, calzadosController.index);
router.post('/', authMiddleware.verificarJWT,calzadosController.create);
router.delete('/:id', authMiddleware.verificarJWT,calzadosController.delete);
router.patch('/:id',authMiddleware.verificarJWT, calzadosController.updateParcial);




module.exports = router;