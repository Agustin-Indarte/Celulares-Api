const fs = require('fs-extra'); // Librería para manejar archivos
const path = require('path'); 


const CelularPath = path.join(__dirname, '../data/celulares.json'); // Ruta del archivo JSON

// Controlador para manejar las operaciones CRUD de celulares

const readCelulares = async () => { // Función para leer los celulares desde el archivo JSON
    const data = await fs.readFile(CelularPath, 'utf8'); //
    return JSON.parse(data);
}


const writeCelulares = async (celulares) => {
    await fs.writeFile(CelularPath, JSON.stringify(celulares, null, 2), 'utf8');
}

module.exports = {
    readCelulares,
    writeCelulares
};