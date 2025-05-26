// Importamos los helpers para leer y escribir celulares en el archivo JSON
const { readCelulares, writeCelulares } = require('../helpers/CelHelpers');
// Importamos uuid para generar IDs únicos
const { v4: uuidv4 } = require('uuid');
// Importamos validationResult para manejar validaciones de express-validator
const { validationResult } = require('express-validator');

// ===============================
// Controlador para obtener todos los celulares
// GET /celulares
// Devuelve un array con todos los celulares almacenados
const getAllCels = async (req, res) => {
    try {
        const celulares = await readCelulares();
        res.status(200).json(celulares);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los celulares' });
    }
}

// ===============================
// Controlador para obtener un celular por su ID
// GET /celulares/:id
// Devuelve el celular que coincide con el ID recibido por parámetro
const getCelById = async (req, res) => {
    const { id } = req.params;
    try {
        const celulares = await readCelulares();
        const celular = celulares.find(c => c.id === id);
        if (!celular) {
            return res.status(404).json({ message: 'Celular no encontrado' });
        }
        res.status(200).json(celular);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el celular' });
    }
}

// ===============================
// Controlador para crear un nuevo celular
// POST /celulares
// Valida los datos y agrega un nuevo celular al archivo JSON
const createCel = async (req, res) => {
    // Validamos los datos recibidos usando express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const celulares = await readCelulares();
        // Creamos el nuevo objeto celular
        const newCelular = {
            id: uuidv4(), // Genera un id único
            nombre: req.body.nombre,
            precio: req.body.precio,
            color: req.body.color || 'Desconocido',
            almacenamiento: req.body.almacenamiento,
            cantidad: req.body.cantidad
        };
        celulares.push(newCelular); // Agregamos el nuevo celular al array
        await writeCelulares(celulares); // Guardamos el array actualizado
        res.status(201).json({
            message: 'Celular creado exitosamente',
            celular: newCelular
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el celular' });
    }
}

// ===============================
// Controlador para actualizar un celular por su ID
// PUT /celulares/:id
// Valida los datos y actualiza el celular correspondiente
const updateCel = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, color, almacenamiento, cantidad } = req.body;
    const celulares = await readCelulares();

    const index = celulares.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Celular no encontrado' });
    }

    // Validamos los datos recibidos usando express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Actualizamos solo los campos recibidos
    const updatedCelular = {
        ...celulares[index],
        nombre: nombre || celulares[index].nombre,
        precio: precio || celulares[index].precio,
        color: color || celulares[index].color,
        almacenamiento: almacenamiento || celulares[index].almacenamiento,
        cantidad: cantidad || celulares[index].cantidad
    };

    celulares[index] = updatedCelular;
    await writeCelulares(celulares);
    res.status(200).json({
        message: 'Celular actualizado exitosamente',
        celular: updatedCelular
    });
}

// ===============================
// Controlador para eliminar un celular por su ID
// DELETE /celulares/:id
// Elimina el celular que coincide con el ID recibido
const deleteCel = async (req, res) => {
    try {
        const celulares = await readCelulares();
        const index = celulares.findIndex(c => c.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: 'Celular no encontrado' });
        }
        celulares.splice(index, 1); // Eliminamos el celular del array
        await writeCelulares(celulares); // Guardamos el array actualizado
        res.status(200).json({ message: 'Celular eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar el celular' });
    }
}

// ===============================
// Controlador para buscar celulares por filtros
// GET /celulares?nombre=...&precio=...&color=...&almacenamiento=...&cantidad=...
// Permite filtrar celulares por nombre, precio máximo, color, almacenamiento y cantidad mínima
const findCelByFilters = async (req, res) => {
    try {
        const celulares = await readCelulares();
        let filteredCels = celulares;

        // Filtro por nombre (parcial, insensible a mayúsculas)
        if (req.query.nombre) {
            filteredCels = filteredCels.filter(c => c.nombre && c.nombre.toLowerCase().includes(req.query.nombre.toLowerCase()));
        }
        // Filtro por precio máximo
        if (req.query.precio) {
            filteredCels = filteredCels.filter(c => c.precio <= parseFloat(req.query.precio));
        }
        // Filtro por color (exacto, insensible a mayúsculas)
        if (req.query.color) {
            filteredCels = filteredCels.filter(c => c.color && c.color.toLowerCase() === req.query.color.toLowerCase());
        }
        // Filtro por almacenamiento (exacto, insensible a mayúsculas)
        if (req.query.almacenamiento) {
            filteredCels = filteredCels.filter(c => c.almacenamiento && c.almacenamiento.toLowerCase() === req.query.almacenamiento.toLowerCase());
        }
        // Filtro por cantidad mínima
        if (req.query.cantidad) {
            filteredCels = filteredCels.filter(c => c.cantidad >= parseInt(req.query.cantidad));
        }

        if (filteredCels.length === 0) {
            return res.status(404).json({ message: 'No se encontraron celulares con los filtros especificados' });
        }

        res.status(200).json(filteredCels);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al buscar el celular' });
    }
}

// Exportamos todos los controladores para usarlos en las rutas
module.exports = {
    getAllCels,
    getCelById,
    createCel,
    updateCel,
    deleteCel,
    findCelByFilters
};
