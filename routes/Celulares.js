var express = require('express');
const { createValidatorCelular,updateValidatorCelular } = require('../Validators/CelValidator'); // Importamos el middleware de validación
const { getAllCels, getCelById, createCel, updateCel, deleteCel, findCelByFilters } = require('../Controllers/CelController'); // Importamos la función para obtener todos los celulares
var router = express.Router();

/* GET home page. */
/* router.get('/', getAllCels);  */
router.get('/',(req,res,next) => {
    if (Object.keys(req.query).length > 0) {
        findCelByFilters(req, res, next);
    } else {
        getAllCels(req, res, next);
    }
})

/* Para buscar un celular deberia ingresar http://localhost:PUERTO/celulares?nombre=nombre */

router.get('/:id', getCelById);

router.post('/', createValidatorCelular, createCel);

router.put('/:id', updateValidatorCelular, updateCel);

router.delete('/:id',deleteCel)

module.exports = router;
