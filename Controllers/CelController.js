const { readCelulares } = require('../helpers/CelHelpers');

const getAllCels = async () => {
    try {
        return await readCelulares();
    } catch (error) {
        console.log('Error al obtener los celulares:', error);
    }
};

module.exports = {
    getAllCels
};



