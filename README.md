# trabajo-practico-integrador-2-santiago-ayala
# Gestor de Tareas – Trabajo Práctico Integrador
## Descripción breve

Este proyecto es una aplicación web que permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas personales. Una vez autenticado, el usuario puede crear, ver, editar y eliminar tareas, incluyendo el estado de cada una (completada o no completada).
El objetivo del trabajo es implementar un CRUD completo con autenticación, rutas protegidas, validaciones y persistencia en base de datos.

## Instrucciones de instalación
1. Clonar el repositorio
git clone https://github.com/SantiagoAyala2118/trabajo-practico-integrador-2-santiago-ayala.git

2. Entrar al proyecto
cd trabajo-practico-integrador-2-santiago-ayala

3. Instalar dependencias
- Backend:
cd servidor
npm install

- Frontend:
cd ../frontend
npm install

## Configuración del archivo .env

En la carpeta servidor, crear un archivo .env con:

```javascript
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=task_manager
JWT_SECRET=poné_un_secreto_acá
COOKIE_SECRET=otro_secreto
```
