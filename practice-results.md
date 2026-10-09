Prueba 1
Método: POST
URL: http://localhost:3001/api/products
Body: 
{
  "name": "Pen",
  "category": "office",
  "stock": 0
}
Respuesta: 201 Created
{
  "id": 4,
  "name": "Pen",
  "category": "office",
  "stock": 0,
  "status": "active"
}

Prueba 2
Método: POST
URL: http://localhost:3001/api/products
Body:
{
  "name": "Pen",
  "category": "office",
  "stock": -1
}
Respuesta:
{
  "statusCode": 400,
  "message": [
    "stock must not be less than 0"
  ],
  "error": "Bad Request"
}

Body:
{
  "name": "Pen",
  "category": "office",
  "stock": "3"
}
Respuesta:
{
  "statusCode": 400,
  "message": [
    "stock must be an integer number"
  ],
  "error": "Bad Request"
}

Prueba 3
Método: POST
URL: http://localhost:3001/api/products
Body:
{
  "name": "Pen",
  "category": "office",
  "stock": 3,
  "status": "inactive"
}
Respuesta:
{
  "statusCode": 400,
  "message": [
    "property status should not exist"
  ],
  "error": "Bad Request"
}

Prueba 4
Método: POST
URL: http://localhost:3001/api/products/1
Body:
{
  "stock": 0
}
Respuesta:
{
  "id": 1,
  "name": "Notebook",
  "category": "office",
  "stock": 0,
  "status": "active"
}

Prueba 5
Método: PATCH
URL: http://localhost:3001/api/products/abc
Body:
{
  "stock": 5
}
Respuesta:
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}

Prueba 6
Método: PATCH
URL: http://localhost:3001/api/products/9999
Body:
{
  "stock": 5
}
Respuesta:
{
  "statusCode": 404,
  "message": "Product with id 9999 was not found",
  "error": "Not Found"
}

Prueba 7
Método: PATCH
Body:
{
  "stock": 5
}
Respuesta:
{
  "statusCode": 409,
  "message": "Product is inactive and cannot be updated",
  "error": "Conflict"
}

Prueba 8
Método: GET
URL: http://localhost:3001/api/products?category=electronics&limit=2
Respuesta:
[
  {
    "id": 2,
    "name": "Mouse",
    "category": "electronics",
    "stock": 5,
    "status": "active"
  },
  {
    "id": 3,
    "name": "Keyboard",
    "category": "electronics",
    "stock": 0,
    "status": "inactive"
  }
]

Prueba 9
Método: GET
URL: http://localhost:3001/api/products?category=toys 
Respuesta:
{
  "statusCode": 400,
  "message": [
    "category must be one of the following values: office, electronics"
  ],
  "error": "Bad Request"
}
URL: http://localhost:3001/api/products?limit=21
Respuesta:
{
  "statusCode": 400,
  "message": [
    "limit must not be greater than 20"
  ],
  "error": "Bad Request"
}

¿Dónde se valida la entrada?

La validación se hace en los DTO, donde se definen las condiciones que deben cumplir los datos. El requestValidationPipe se encarga de revisar que la información que llega desde Postman cumpla esas condiciones antes de procesarla.

¿Dónde se impide editar un producto inactivo?

Esto se controla en ProductRulesService, que revisa si el producto se puede modificar antes de guardar los cambios. Si está inactivo, no permite actualizarlo y devuelve un error 409.

1. ¿Por qué el stock 0 debe aceptarse y el texto "3" debe rechazarse?

Porque un producto puede quedarse sin unidades disponibles, por eso el stock 0 es válido. En cambio, "3" está escrito como texto y lo que necesitamos es un número.

2. ¿Qué permite omitir name en el PATCH sin aceptar cualquier dato cuando sí se envía?

@IsOptional() permite no enviar el nombre si solo quiero actualizar otro dato, como el stock. Pero si envío el nombre, debe cumplir las condiciones establecidas, como ser un texto, no estar vacío y tener máximo 60 caracteres.

3. ¿Por qué actualizar un producto inactivo puede devolver 409, aunque el ID y el body sean válidos?

Porque no basta con que los datos estén bien escritos; también hay que revisar si se permite hacer el cambio. En este caso, el sistema no permite modificar productos inactivos y por eso devuelve el error 409.