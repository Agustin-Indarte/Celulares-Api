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
├── Middlewares/
│   └── logger.js                # Middleware para registro de solicitudes HTTP
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

- **Middlewares/logger.js**
  - Middleware que registra todas las solicitudes HTTP en un archivo de log (`logs/logs.txt`). Útil para auditoría y depuración, ya que guarda la fecha, método y URL de cada request recibida.

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

## Cómo probar la API con Postman

1. **Inicia el servidor**
   - Asegúrate de tener el proyecto corriendo con `npm start` o el comando que uses.

2. **Configura la URL base**
   - Por defecto suele ser: `http://localhost:3000/celulares` (ajusta el puerto si es diferente en tu proyecto).

3. **Ejemplos de requests:**

- **Obtener todos los celulares**
  - Método: `GET`
  - URL: `http://localhost:3000/celulares`

- **Obtener un celular por ID**
  - Método: `GET`
  - URL: `http://localhost:3000/celulares/ID_DEL_CELULAR`

- **Crear un celular**
  - Método: `POST`
  - URL: `http://localhost:3000/celulares`
  - Body (JSON):
    ```json
    {
      "nombre": "Samsung Galaxy S23",
      "precio": 950,
      "color": "Negro",
      "almacenamiento": "256GB",
      "cantidad": 10
    }
    ```

- **Actualizar un celular**
  - Método: `PUT`
  - URL: `http://localhost:3000/celulares/ID_DEL_CELULAR`
  - Body (JSON):
    ```json
    {
      "nombre": "Nuevo Nombre",
      "precio": 1000
    }
    ```

- **Eliminar un celular**
  - Método: `DELETE`
  - URL: `http://localhost:3000/celulares/ID_DEL_CELULAR`

- **Buscar celulares por filtros**
  - Método: `GET`
  - URL: `http://localhost:3000/celulares?nombre=Samsung&color=Negro`

4. **Verifica las respuestas**
   - Postman mostrará la respuesta JSON de la API. Si hay errores de validación, también se mostrarán en la respuesta.

---

Si vuelves a este proyecto en el futuro, revisa este README y los comentarios en los controladores para entender rápidamente la estructura y el flujo de la aplicación.
