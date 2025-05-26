var express = require('express');
var router = express.Router();
const { getAllCels } = require('../Controllers/CelController'); // Importamos la función para obtener todos los celulares

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const celulares = await getAllCels();
    if (!celulares || celulares.length === 0) {
      return res.status(404).json({ message: 'No se encontraron celulares' });
    }
    // Si se encontraron celulares, los retornamos en formato JSON
    res.json(celulares);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los celulares' });
  }
});

module.exports = router;
