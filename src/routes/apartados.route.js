const express = require('express');
const router = express.Router();
const apartadosController = require('../controllers/apartados.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', apartadosController.index);
router.post('/', apartadosController.create);
router.delete('/:id', apartadosController.deleteLogico);
router.patch('/:id', apartadosController.updateParcial);




module.exports = router;