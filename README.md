# MOD 2 LAB

En este laboratorio repasaremos los conceptos principales del módulo 2: 
-	Creación de un proyecto Express desde 0
-	Plantillas de HBS
- Modelos de Mongoose
-	Registro/Login de usuarios
- Securización de rutas
- Relaciones entre modelos
-	CRUDs
-	Formularios

El laboratorio consistirá en crear un mini Twitter; cualquier usuario podrá ver los tweets publicados, pero para poder publicar un nuevo tweet será obligatorio estar registrado. Este ejemplo https://ex-templating.fly.dev te puede servir de guía, pero no será necesario implementar todo lo que vemos en él.

## Iteración 1

Lo primero de todo es inicializar el proyecto de Node con `npm init`, instalar Express con `npm i Express` y crear la estructura básica del proyecto:
```
config/
controllers/
models/
views/
middlewares/
app.js
```

Da forma al `app.js`` con lo básico para poder arrancar la aplicación de Express escuchando en el puerto 3000

## Iteración 2

Configuración de `hbs`:
- En `app.js` configura el motor de renderización y la ruta carpeta de vistas
- Crea un `views/layout.hbs` (no te preocupes por los estilos por ahora!)

## Iteración 3

Configura la conexión contra la base de datos en `config/db.config.js`

## Iteración 4

Antes de poder crear nuestro primer tweet necesitamos que los usuarios se puedan registrar y hacer login en nuestra applicación, cada usuario contará con:

- name
- username
- password
- avatarUrl (Puedes usar una url del estilo: https://i.pravatar.cc/150?u=iron-fake@pravatar.com)

Pasos a seguir:
- Modelo: Crea el modelo de usuario `models/user.model.js` 
- Registro: Implementa las acciones del controlador `controllers/users.controller.js` create y doCreate
- Login: Implementa las acciones del controlador `controllers/users.controller.js` login y doLogin

Ten en cuenta que la contraseña del usuario no puede almacenarse en claro en la base de datos (`bcrypt-js` es tu amigo)

## Iteración 5

Definición del modelo de Tweet `models/tweet.model.js`:

- message: el contenido del tweet
- user: el creador del tweet, será una relación de 1..N, es decir, un usuario podrá estar relacionado con N tweets
- La fecha de creación del tweet (`{ timestamps: true }`)

## Iteración 6

Creación de un Tweet:

- ruta: `/tweets/new`
- controlador: `controllers/tweets.controller.js`
- vista: `views/tweets/create.hbs`

Ten en cuenta que solo podremos crear y acceder a la ruta de crear un nuevo tweet si el usuario está autenticado. El campo `user` del modelo de tweet será el identificador del usuario que haya iniciado sesión.

## Iteración 7

Listado de Tweets:

- ruta: `/tweets`
- controlador: `controllers/tweets.controller.js`
- vista: `views/tweets/list.hbs`

Esta ruta será accesible por todos los usuarios de la aplicación (hayan iniciado sesión o no) la información mostrada por cada tweet será:
- username del usuario que lo creó (populate es tu amigo)
- el tiempo trascurrido desde que se creo el tweet (momentjs te puede ayudar https://momentjs.com)
- el contenido del tweet

## Iteración 8

Perfil del usuario:

- ruta: `/profile`
- controlador: `controllers/users.controller.js`
- vista: `views/users/profile.hbs`

Deberá mostrar la información de perfil del usuario que ha iniciado sesión donde podremos encontrar su información básica y un listado de todos los tweets que ha creado (virtual populate es tu amigo)

## Iteración 9

Borrado de un tweet; sólo el dueño de un tweet podrá borrarlo

## Iteración 10

Dale cariño al CSS, barra de navegación, footer, formularios, listados, etc...