# DESARROLLO DE SISTEMAS INFORMÁTICOS

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-ccolivares/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-ccolivares/actions/workflows/tests.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-ccolivares&metric=alert_status)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-ccolivares)

## Práctica 8: Aplicación de procesamiento de notas de texto

### Introducción

En esta práctica implementaremos una aplicación que procesará notas de texto. Podremos añadir, enlistar, leer, modificar o eliminar notas de un usuario concreto. Para procesar esta información trabajaremos con el formato **JSON**. Para controlar nuestra aplicación utilizaremos la entrada de comandos apoyándonos en el paquete [Yarg](https://www.npmjs.com/package/yargs).
De igual forma utilizaremos la API Síncrona de **Node.js** para el control del sistema de archivos.

### Desarrollo

Para desarollar esta práctica hemos hecho uso de dos archivos, uno de ellos contendrá la clase nota, el otro contendrá el funcionamiento en sí de nuesta aplicación.

#### [Note.ts](./src/note.ts)

Este archivo contendrá la clase Note, la cual creará objetos de tipo `Note` que guardarán el título, cuerpo de la nota y el color de la misma en sus atributos. 

Esta también contendrá los métodos necesarios para imprimir el contenido de las notas con el color correspondiente utilizando el paquete [Chalk](https://www.npmjs.com/package/chalk), que se encargará de darle formato al texto que le proporcionemos.

El método `printTitle()` filtrará el título de la nota e imprimirá el contenido de este con el color correspondiente utilizando [Chalk](https://www.npmjs.com/package/chalk). Igual que este, el método `printText()` realizará lo mismo pero en este caso filtrando el texto de la nota.

#### [Note-app.ts](./src/note-app.ts)

Este archivo realizará toda la funcionalidad de nuestra aplicación de notas, la lectura de distintas opciones por comandos en la terminal y la funcionalidad de estos añadidos. Para la distinción entre usuarios nuestra aplicación creará un directorio para cada uno de ellos, dentro de este estarán las notas correspondientes al usuario en archivos __j.son__ con los datos de las mismas en formato **JSON**.

Para añadir estas opciones utilizaremos el paquete [Yarg](https://www.npmjs.com/package/yargs) el cual permitirá añadir opciones a nuestro comando de compilación `node`. Utilizaremos opciones distintas para cada una de las funcionalidades de nuestro programa, las cuales serán añadir, enlistar, leer, modificar o eliminar notas. Esta será su sintaxis: 

```bash
// AÑADIR UNA NOTA
$ node [ruta del archivo a compilar] add --user="usuario" --title="titulo de la nota" --text="contenido de la nota" --color="color de la nota (red, green, yellow, blue)"

// ENLISTAR LAS NOTAS DE UN USUARIO
$ node [ruta del archivo a compilar] list --user="usuario"

// LEER UNA NOTA
$ node [ruta del archivo a compilar] read --user="usuario" --title="titulo de la nota"

// ELIMINAR UNA NOTA
$ node [ruta del archivo a compilar] remove --user="usuario" --title="titulo de la nota"

// MODIFICAR UNA NOTA
$ node [ruta del archivo a compilar] modify --user="usuario" --title="titulo de la nota" --text="contenido de la nota" --color="color de la nota (red, green, yellow, blue)"
```

Cada una de estas funcionalidades las desarrollaremos aparte de forma modular de la siguiente forma: 

- El método `addNewNote()` será el encargado de crear un nuevo archivo __.json__ con el contenido de la nota. En el caso de intentar crear una nota para un usuario nuevo creará un directorio para las notas de este. Si la nota ya estuviera creada saltará un error. Trabajamos como mencionamos anteriormente en formato **JSON**, por lo tanto debemos crear nuestros archivos en ese formato, el cual se verá de la siguiente forma: 

```json
{
  "user": "usuario",
  "title": "titulo de la nota",
  "text": "contenido de la nota",
  "color": "color de la nota" // ---> colores disponibles: Red, Yellow, Green, Blue
}
```

Para este método utilizamos `fs.existSync()` una función de **Node.js** que comprueba que la ruta que le proporcionamos existe, también `writeFileSync()` que la utilizaremos para insertar el contenido en **JSON** en el archivo correspondiente y `mkdirSync()` que nos ayudará a crear el directorio del usuario en caso de ser necesario.
También utilizaremos `stringify()`, una método para los objetos tipo **JSON** que convertirá los datos que le hemos proporcionado en el formato que mencioné anteriormente en una cadena de texto tipo **JSON**.

- El método `listNotes()` filtrará las notas que tiene un usuario en concreto y mostrará los títulos de las notas en su colores correspondientes. Para esto hemos utilizado la función de **Node.js** `readdirSync()` que almacenará en un vector de strings el nombre de los archivos encontrados en el directorio indicado. Utilizaremos también la función `parse()` para los objetos tipo **JSON** que convierte una cadena en formato **JSON** en un objeto, por lo tanto seremos capaces de acceder a sus parámetros y tratar correctamente la información en este formato. Utilizaremos también el método `printTitle()` que creamos en la clase `Note`.

- El método `readNotes()` mostrará el contenido de una nota en concreto por pantalla, por lo tanto debemos proporcionarle el usuario y el título de la nota. Para realizar esto haremos uso de la función de **Node.js** `readFileSync()` que simplemente lee todo el contenido de un archivo, debemos especificarle la codificación __(utf-8)__ para poder trabajar sin problemas de esta forma. Además de eso tomaremos en cuenta todo lo que hemos mencionado anteriormente sobre el formato JSON. En esta ocasión utilizaremos los métodos de impresión que creamos en la clase `Note`. 

- El método `removeNotes()` se encargará de eliminar notas ya creadas mediante la función `fs.rmSync()` de **Node.js** a la que solo debemos proporcionarle la ruta y eliminará el archivo que le indiquemos. Este método, como el resto, realiza comprobaciones de la existencia de lo que le sugerimos, si nos equivocamos lo indicará. De la misma manera confirmará que las acciones que le pedimos se realizan correctamente.

- El método `modifyNote()` será el responsable de llevar a cabo las modificaciones que queramos hacer a nuestras notas. Para ello eliminará la nota antigua y creará una nueva nota con los cambios solicitados, siendo así posible cambiar cualquier parámetro de la nota menos el usuario al que pertenece.

- El método `spacesToBars()` será un método auxiliar que sustituirá los espacios por barras bajas para evitar problemas al crear los nombres de los archivos con espacios, le proporcionaremos el título de nuestra nota y este le dará el formato que queremos para que sea el título del archivo __.json__.

### Conclusión

En esta práctica hemos desarrollado nuestros conocimientos en sistemas de archivos con **Node.js** que considero extremadamente importante para muchas situaciones y además nos hemos familiarizado con el formato **JSON** que resulta muy útil para el filtrado de la información. En general ha sido una práctica muy enriquecedora e interesante. 

### Bibliografía

[Guión de la práctica 8](https://ull-esit-inf-dsi-2021.github.io/prct08-filesystem-notes-app/)

[Introducción a Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-intro.html)

[Sistema de ficheros en Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-filesystem.html)

[Yarg](https://www.npmjs.com/package/yargs)

[Chalk](https://www.npmjs.com/package/chalk)

[API síncrona (Node.js)](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_synchronous_api)


