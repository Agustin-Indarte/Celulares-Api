var express = require('express');
const { createValidatorCelular,updateValidatorCelular } = require('../Validators/CelValidator'); // Importamos el middleware de validación
const { getAllCels, getCelById, createCel, updateCel } = require('../Controllers/CelController'); // Importamos la función para obtener todos los celulares
var router = express.Router();

/* GET home page. */
router.get('/', getAllCels); 

router.get('/:id', getCelById);

router.post('/', createValidatorCelular, createCel);

router.put('/:id', updateValidatorCelular, updateCel);

module.exports = router;
