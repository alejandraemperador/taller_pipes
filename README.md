# Práctica individual — Inventory API

Tiempo máximo de trabajo: **90 minutos**.

El proyecto ya contiene la conexión a PostgreSQL, la entidad, los servicios, los repositorios y los datos iniciales. Completar únicamente los tres DTO y el controlador: implementar el método de creación y modificar las entradas de actualización y búsqueda. No crear otro proyecto.

## Inicio

Requisitos: una versión compatible de Node.js (20.19+ en la rama 20, 22.13+ en la rama 22, o 24.11+), Docker Desktop iniciado y Postman.

Desde la carpeta que contiene `package.json`:

```bash
npm ci
docker compose up -d
npm run start:dev
```

La API utiliza `http://localhost:3001/api/products` y PostgreSQL el puerto `5434`. Son puertos diferentes de Coffee Orders. La configuración de desarrollo está incluida; copiar `.env.example` a `.env` es opcional si se quieren modificar los valores.

La primera ejecución crea los productos `Notebook`, `Mouse` y `Keyboard`. El último es inactivo. Los datos no se reinician al volver a ejecutar la aplicación. Consultar `GET /api/products` para conocer sus IDs reales.

Al inicio, la búsqueda y la actualización tienen validación incompleta a propósito. El método del controlador para `POST /api/products` está pendiente: hasta implementarlo, esa petición devuelve `404` porque la ruta todavía no existe. Los GET de lista y por ID funcionan para consultar los datos iniciales. Que la aplicación compile no significa que el ejercicio esté resuelto.

## Archivos que se deben modificar

- `src/products/dto/create-product.dto.ts`
- `src/products/dto/update-product.dto.ts`
- `src/products/dto/filter-products-query.dto.ts`
- `src/products/products.controller.ts`

Buscar los comentarios `TODO`. El pipe `requestValidationPipe` ya está configurado e importado; falta aplicarlo a las entradas solicitadas. No activar un pipe global ni modificar la configuración de base de datos.

## 1. Completar el controlador y validar la creación

En `POST /api/products`, aceptar únicamente:

| Campo | Condición |
| --- | --- |
| `name` | Obligatorio, texto, diferente de `""`, máximo 60 caracteres. |
| `category` | Obligatorio; únicamente `office` o `electronics`. |
| `stock` | Obligatorio; número entero entre 0 y 1000. |

Agregar los validadores a `CreateProductDto`. En `products.controller.ts`, implementar el método `create` en el espacio marcado con `TODO 1`:

- Definir la ruta con `@Post()`; el prefijo `products` ya está definido en la clase.
- Recibir el body mediante `@Body()`, tipado como `CreateProductDto`, y aplicar `requestValidationPipe` a esa entrada.
- Llamar a `this.productsService.create(dto)` y retornar su resultado.

No copiar lógica del servicio al controlador ni acceder al repositorio desde él. El método del servicio ya está implementado.

Rechazar campos adicionales, incluido `status`. No convertir los números del body: `"stock": "3"` no es válido. El pipe ya está configurado: no crear un pipe personalizado ni uno adicional.

Ejemplo válido; **un stock de 0 sí está permitido**:

```json
{
  "name": "Pen",
  "category": "office",
  "stock": 0
}
```

Resultado: `201` y un producto con estado `active`, asignado por el servicio.

## 2. Validar la actualización parcial

En `PATCH /api/products/:id`:

- Aplicar `ParseIntPipe` al ID, recibirlo como `number` y quitar `Number(id)`.
- Aceptar únicamente `name` y `stock`, ambos opcionales.
- Si se envían, deben cumplir las mismas condiciones de creación.
- Aplicar `requestValidationPipe` al body.
- Rechazar propiedades adicionales. No permitir cambiar `category` ni `status`.

La regla de producto inactivo ya está implementada y conectada en `ProductsService`. No reescribirla ni trasladarla al controlador: un body válido para un producto inactivo debe producir `409` y no guardar cambios.

Ejemplo válido para un producto activo:

```json
{ "stock": 0 }
```

Resultado: `200`; cambia el stock y conserva los demás datos. No se exige enviar `name`.

## 3. Validar la búsqueda

En `GET /api/products`:

| Query | Condición |
| --- | --- |
| `category` | Opcional; únicamente `office` o `electronics`. |
| `limit` | Convertir explícitamente a número con `@Type(() => Number)`. Exigir un entero entre 1 y 20. Valor predeterminado 5. |

Aplicar `requestValidationPipe` a la query completa. El servicio ya implementa el filtro, el límite y el orden por ID ascendente. No modificarlo.

Ejemplo: `GET /api/products?category=electronics&limit=2`.

Resultado: `200` y un arreglo con máximo dos productos de esa categoría. Incluye productos activos e inactivos: el filtro no es por estado.

## Verificación mínima

Mantener válidos los demás datos cuando se pruebe un error.

| Caso | Resultado esperado |
| --- | --- |
| Crear `Pen` con stock 0 y categoría `office`. | `201`. |
| Crear con stock -1 o stock `"3"`. | `400` en ambos casos. |
| Crear con una propiedad adicional, como `status`. | `400`. |
| Actualizar solo el stock de un producto activo a 0. | `200`; conserva el nombre. |
| Actualizar con ID `abc` y body válido. | `400`. |
| Actualizar un ID entero inexistente y body válido. | `404`. |
| Actualizar `Keyboard`, que está inactivo, con body válido. | `409`; conserva sus datos. |
| Buscar `?category=electronics&limit=2`. | `200`; respeta categoría y límite. |
| Buscar `?category=toys` o `?limit=21`. | `400` en ambos casos. |

`GET /api/products/:id` ya está terminado. Utilizarlo para verificar que un producto rechazado no cambió.

Los casos con `null` y body vacío quedan fuera del alcance. `@IsOptional()` omite validadores cuando el valor es `null` o `undefined`; no agregar validaciones personalizadas para estos casos durante esta práctica.

## Entrega

Entregar los cuatro archivos modificados y `practice-results.md` con una tabla de las peticiones y sus códigos HTTP. Agregar una explicación de dos o tres líneas sobre por qué una entrada inválida devuelve `400`, mientras que actualizar un producto inactivo devuelve `409`.

No se solicitan frontend, autenticación, eliminación, nuevos módulos, cambios de repositorios ni pruebas automatizadas. Las verificaciones se realizan por HTTP.

## Organización sugerida

- 10 minutos: iniciar el proyecto y revisar los archivos.
- 50 minutos: completar los tres DTO y el controlador.
- 20 minutos: ejecutar las peticiones.
- 10 minutos: corregir errores y registrar resultados.

Los servicios y datos iniciales son material de apoyo, no la solución de los DTO ni del método de creación del controlador. No se incluyen validadores ni conexiones de pipes resueltas para los endpoints del ejercicio.
