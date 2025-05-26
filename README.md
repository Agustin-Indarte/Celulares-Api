# Celulares-Api

Este proyecto es una API REST para la gestión de productos celulares. Permite realizar operaciones CRUD (crear, leer, actualizar, eliminar) y búsquedas filtradas sobre un archivo JSON que almacena los datos de los celulares.

## Estructura de Carpetas

```
Celulares-Api/
│
├── Controllers/
│   └── CelController.js         # Lógica de negocio y controladores de rutas
│
├── Data/
│   └── Celulares.json           # Archivo JSON con los datos de los celulares
│
├── helpers/
│   └── CelHelpers.js            # Funciones para leer y escribir el archivo JSON
│
├── routes/
│   └── Celulares.js             # Definición de rutas de la API
│
├── Validators/
│   └── CelValidator.js          # Validaciones de datos para crear/actualizar celulares
│
├── package.json                 # Dependencias y scripts del proyecto
└── README.md                    # Documentación del proyecto
```

## Archivos Importantes y Funciones

- **Controllers/CelController.js**
  - Contiene los controladores para cada endpoint de la API:
    - `getAllCels`: Devuelve todos los celulares.
    - `getCelById`: Devuelve un celular por su ID.
    - `createCel`: Crea un nuevo celular (valida los datos).
    - `updateCel`: Actualiza un celular existente (valida los datos).
    - `deleteCel`: Elimina un celular por su ID.
    - `findCelByFilters`: Busca celulares por filtros (nombre, precio, color, almacenamiento, cantidad).

- **Data/Celulares.json**
  - Archivo donde se almacenan los datos de los celulares en formato JSON.

- **helpers/CelHelpers.js**
  - Funciones auxiliares para leer (`readCelulares`) y escribir (`writeCelulares`) el archivo JSON.

- **routes/Celulares.js**
  - Define las rutas de la API y conecta cada ruta con su controlador correspondiente.

- **Validators/CelValidator.js**
  - Define las validaciones para los datos de entrada al crear o actualizar un celular.

## ¿Cómo funciona?

- Las rutas están definidas en `routes/Celulares.js` y usan los controladores de `Controllers/CelController.js`.
- Los datos se almacenan y leen desde `Data/Celulares.json` usando los helpers.
- Las validaciones aseguran que los datos sean correctos antes de crear o actualizar un celular.
- Puedes buscar celulares por nombre, precio, color, almacenamiento y cantidad usando parámetros de consulta.

## Ejemplo de uso de la API

- Obtener todos los celulares:
  - `GET /celulares`
- Obtener un celular por ID:
  - `GET /celulares/:id`
- Crear un celular:
  - `POST /celulares` (con body JSON)
- Actualizar un celular:
  - `PUT /celulares/:id` (con body JSON)
- Eliminar un celular:
  - `DELETE /celulares/:id`
- Buscar celulares por filtros:
  - `GET /celulares?nombre=Samsung&color=Negro`

---

Si vuelves a este proyecto en el futuro, revisa este README y los comentarios en los controladores para entender rápidamente la estructura y el flujo de la aplicación.
