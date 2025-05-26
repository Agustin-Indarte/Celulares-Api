const {body} = require('express-validator');

const nombreValidator = body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres');

const precioValidator = body('precio')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .isNumeric()
    .withMessage('El precio debe ser un número')
    .custom((value) => {
        if (value <= 0) {
            throw new Error('El precio debe ser mayor que cero');
        }
        return true;
    });

const ColorValidator = body('color')
    .isLength({ min: 3, max: 20 })
    .withMessage('El color debe tener entre 3 y 20 caracteres')
    .isIn(["Negro", "Plata", "Azul", "Verde"])
    .withMessage('El color debe ser uno de los siguientes: Negro, Plata, Azul, Verde');

const AlmacenamientoValidator = body('almacenamiento')
    .notEmpty()
    .withMessage('El almacenamiento es obligatorio')
    .isLength({ min: 2, max: 10 })
    .withMessage('El almacenamiento debe tener entre 2 y 10 caracteres')
    .isIn(["64GB", "128GB", "256GB"])
    .withMessage('El almacenamiento debe ser uno de los siguientes: 64GB, 128GB, 256GB');

const CantidadValidator = body('cantidad')
    .notEmpty()
    .withMessage('La cantidad es obligatoria')
    .isNumeric()
    .withMessage('La cantidad debe ser un número')
    .custom((value) => {
        if (value < 0) {
            throw new Error('La cantidad no puede ser negativa');
        }
        return true;
    });


exports.createValidatorCelular = [
    nombreValidator,
    precioValidator,
    ColorValidator,
    AlmacenamientoValidator,
    CantidadValidator
]

exports.updateValidatorCelular = [
    nombreValidator.optional(),
    precioValidator.optional(),
    ColorValidator,
    AlmacenamientoValidator.optional(),
    CantidadValidator.optional()
]



