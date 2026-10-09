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