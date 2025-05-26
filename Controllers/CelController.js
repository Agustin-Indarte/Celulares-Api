const { readCelulares,writeCelulares } = require('../helpers/CelHelpers');
const {v4:uuidv4} = require('uuid');
const { validationResult } = require('express-validator');

// Funciones para manejar las operaciones CRUD de celulares

// Controlador para obtener todos los celulares
const getAllCels = async (req, res) =>{
    try {
        const celulares = await readCelulares();
        res.status(200).json(celulares); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los celulares' });
    }
}

// Funcion para obtener un celular por su ID
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

// Funcion para crear un nuevo celular
const createCel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const celulares = await readCelulares();

        const newCelular = {
            id: uuidv4(),
            nombre: req.body.nombre,
            precio: req.body.precio,
            color: req.body.color || 'Desconocido',
            almacenamiento: req.body.almacenamiento,
            cantidad: req.body.cantidad
        };
        celulares.push(newCelular);
        await writeCelulares(celulares);
        res.status(201).json({
            message: 'Celular creado exitosamente',
            celular: newCelular
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el celular' });
        
    }
}

//Funcion para actualizar un celular por su ID
const updateCel = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, color, almacenamiento, cantidad } = req.body;
    const celulares = await readCelulares();

    const index = celulares.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Celular no encontrado' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const updatedCelular = {
        ...celulares[index],
        nombre:nombre || celulares[index].nombre,
        precio:precio || celulares[index].precio,
        color:color || celulares[index].color,
        almacenamiento:almacenamiento || celulares[index].almacenamiento,
        cantidad:cantidad || celulares[index].cantidad
    };

    celulares[index] = updatedCelular;
    await writeCelulares(celulares);
    res.status(200).json({
        message: 'Celular actualizado exitosamente',
        celular: updatedCelular
    });
}

// Funcion para eliminar un celular por su ID

const deleteCel = async (req, res) => {
    try {
        
        const celulares = await readCelulares();

        const index = celulares.findIndex(c => c.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: 'Celular no encontrado' });
        }

        celulares.splice(index, 1);
        await writeCelulares(celulares);
        res.status(200).json({ message: 'Celular eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar el celular' });
        
    }
}

module.exports = {
    getAllCels,
    getCelById,
    createCel,
    updateCel,
    deleteCel
};
