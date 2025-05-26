const {validationResult} = require('express-validator'); // Controlador de validaciones
const fs = require('fs-extra'); // Librería para manejar archivos
const path = require('path'); 
const {v4: uuidv4} = require('uuid'); // Generador de IDs únicos

const CelularPath = path.join(__dirname, '../data/celulares.json'); // Ruta del archivo JSON

// Controlador para manejar las operaciones CRUD de celulares

const readCelulares = async () => { // Función para leer los celulares desde el archivo JSON
    const data = await fs.readFile(CelularPath, 'utf8'); //
    return JSON.parse(data);
}


const writeCelulares = async (celulares) => { // Función para escribir los celulares en el archivo JSON
    await fs.writeFile(CelularPath,celulares)
}

module.exports = {
    readCelulares,
    writeCelulares
};