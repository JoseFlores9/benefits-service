<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

Resolución de primer desafío de entrevista tecnica para Dodo.

Este proyecto implementa un microservicio REST el cual está encargado de exponer información de y centralizar la información de un colaborador

## Instrucciones para correr el proyecto

Crear archivo con nombre .env en la raíz del proyecto y dentro agregar el contenido que se indica en el archivo .pdf

Instalar dependecias
```bash
$ npm install
```

Correr el proyecto

```bash
# development
$ npm run start
```

## Correr tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 🧾 Endpoints principales

### `GET /collaborators`
Obtiene todos los colaboradores registrados.

- **Query Params:**
  - `withDeleted` (boolean, opcional): Si `true`, incluye los colaboradores eliminados lógicamente.

### `GET /collaborators/:identifier`
Busca un colaborador por su `identifier` único.

- **URL Params:**
- `identifier` (string): rut del colaborador sin puntos ni guión

### `POST /collaborators`
Crea un nuevo colaborador. Si el `identifier` ya existe y fue eliminado, lo restaura.

- **Body:**
```json
{
  "name": "José Flores",
  "identifier": "112223334",
  "companies": {
    "bank": ["bci", "banco_estado"],
    "telco": ["entel"],
    "caja": ["los_andes"]
  }
}
```

### `PUT /collaborators/:id`
Actualiza completamente un colaborador (reemplaza todo el contenido).

**URL Params:**

- `identifier` (string): rut del colaborador sin puntos ni guión

**Body:**
```json
{
  "name": "José Flores",
  "companies": {
    "bank": ["bci"],
    "telco": ["entel"]
  }
}
```

### `PATCH /collaborators/:id`
Actualiza parcialmente uno o más campos de un colaborador.

**URL Params:**

- `id` (string): ID del colaborador.

**Body (ejemplo):**
```json
{
  "name": "José F. Actualizado"
}
```

### `DELETE /collaborators/:id`
Elimina lógicamente un colaborador.

**URL Params:**

- `identifier` (string): ID del colaborador.

### `GET /benefits/collaborator/:identifier`
Obtiene los beneficios asociados a un colaborador según su `identifier`.

Este endpoint permite filtrar beneficios por tipo (`bank`, `telco`, `caja`, etc.) o bien retornar **todos los beneficios disponibles** si se usa el parámetro `all=true`.

**URL Params:**

- `identifier` (string): Identificador único del colaborador.

**Query Params:**

- `benefitType` (string[]): Tipos de beneficios separados por coma. Ej: `?benefitType=bank,telco`

**Ejemplos:**

- Obtener beneficios de tipo `bank` y `telco`:

## Supuestos tomados

- Solo se harán preguntas relacionadas con beneficios.
- Al ser mock apis los beneficios que se responderan serán fijos y siempre los mismos independiente de las empresas, bancos o caja de compensación que se le asignen como contratadas al usuario.
- El formato de rut de cara al chatbot debe ser sin puntos y con guión.
- Se asume que para la instalación del proyecto ya se tiene instalado node y npm.
- Al haber creación y manejo de usuarios se asumió que debía existir una base de datos donde almacenarlos, en este caso se utilizó MongoDB para almacenarlos

## Mejoras o futuras ideas

### Implementación de autenticación

Por temas de seguridad se debe implementar autenticación a la hora de crear o manejar los datos de los colaboradores, lo mismo pasa con el endpoint que obtiene beneficios basado en el rut de un colaborador.

### Asociar número de teléfono u otros datos al usuario

Para un mejor flujo se podrían asociar uno o más números de teléfono al colaborador, de esta manera se evitaria preguntar por datos constantemente y podría mejorar la usabilidad del chat, de igual manera se deberían tener consideraciones a la hora de implementarlo, como es el caso de que pasa si se pregunta por un segundo rut desde un mismo número de teléfono.

### Beneficios sugeridos

Teniendo una implementación de un chatbot de manera correcta y trabajando con una ia que analice el lenguaje natural y las preferencias del usuario se podría sugerir beneficios relacionados a los que el usuario consulta, por ejemplo si consulta por beneficios relacionados con viajes se le podría recomendar dentro de la misma respuesta beneficios de estadía en hoteles, etc.
