// Middleware de logger para registrar todas las solicitudes HTTP en un archivo de log
const fs = require('fs');
const path = require('path');

// Definimos la ruta del directorio y archivo de logs
const logDir = path.join(__dirname, '../logs');
const logFile = path.join(logDir, 'logs.txt');

// Crear el directorio de logs si no existe
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Middleware principal
const logger = (req, res, next) => {
    // Obtenemos la fecha y hora actual en formato ISO
    const timestamp = new Date().toISOString();
    // Creamos la entrada de log con método y URL
    const logEntry = `${new Intl.DateTimeFormat('es-AR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: false, 
        second: 'numeric', 
        timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date(timestamp))} - ${req.method} ${req.originalUrl}\n`;

    // Escribimos la entrada en el archivo de logs
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) {
            console.error('Error escribiendo el archivo de log:', err);
        }
    });
    // Continuamos con el siguiente middleware o ruta
    next();
}

module.exports = logger;


// Este middleware registra las solicitudes HTTP en un archivo de log para auditoría y depuración.