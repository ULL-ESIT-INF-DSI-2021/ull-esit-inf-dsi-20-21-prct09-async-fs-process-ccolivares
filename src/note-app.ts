import * as fs from 'fs';
import * as chalk from 'chalk';
import * as yargs from 'yargs';
import { Note } from './note';

// type Color = "Red" | "Green" | "Yellow" | "Blue"

/**
 * Creación de la opción "add" para la línea de comandos. Crea una nueva nota.
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: { // --user="usuario"
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: { // --title="Titulo de la nota"
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    text: { // --text="Contenido de la nota"
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: { // --color="Blue"
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.text === 'string' && typeof argv.color === 'string') {
      let note = new Note(argv.title, argv.text, argv.color);
      let fileRoute: string = "notes/" + argv.user + "/" + spacesToBars(argv.title) + ".json";
      addNewNote(argv.user, note);
      if (fs.existsSync(fileRoute))
        console.log(chalk.green("La nota ha sido creada"));
    }
  },
});

/**
 * Creación de la opción "list" para la línea de comandos. Enlista los títulos de las notas de un usuario en concreto.
 */
yargs.command({
  command: 'list',
  describe: 'List notes',
  builder: {
    user: { // --user="usuario"
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      listNotes(argv.user);
    }
  },
});

/**
 * Creación de la opción "read" para la línea de comandos. Lee una nota en específico. Necesita conocer el título de la misma.
 */
yargs.command({
  command: 'read',
  describe: 'Read all user notes',
  builder: {
    user: { // --user="usuario"
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: { // --title="Titulo de la nota"
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      readNotes(argv.user, argv.title);
    }
  },
});

/**
 * Creación de la opción "remove" para la línea de comandos. Elimina una nota. Necesita saber el título de la misma.
 */
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: { // --user="usuario"
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: { // --title="Titulo de la nota"
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      removeNotes(argv.user, argv.title);
      let fileRoute: string = "notes/" + argv.user + "/" + argv.title + ".json";
      if (fs.existsSync(fileRoute))
        console.log(chalk.red("No se ha podido eliminar la nota"));
      else
        console.log(chalk.green("Se ha eliminado la nota correctamente"));
    }
  },
});

/**
 * Creación de la opción "modify" para la línea de comandos. Modifica cualquier parámetro de una nota.
 */
yargs.command({
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: { // --user="usuario"
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: { // --title="Titulo de la nota"
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    text: { // --text="Contenido de la nota"
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: { // --color="Blue"
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.text === 'string' && typeof argv.color === 'string') {
      let note = new Note(argv.title, argv.text, argv.color);
      modifyNote(argv.user, note);
    }
  },
});

yargs.parse();

/**
 * Método que sustituye los espacios de una cadena por barras bajas, se utilizará para escribir correctamente los nombres de los archivos.
 * @param title Cadena correspondiente al título de una nota, el cual pasará a ser el nombre del archivo.
 * @returns Devuelve la cadena corregida con las barras bajas.
 */
export function spacesToBars(title: string): string {
  
  let auxString: string = "";

  for (let char of title) {
    if (char == " ")
      auxString += "_"
    else
      auxString += char;
  }

  return auxString;
}

/**
 * Este método añade nuevas notas para usuarios en concreto. Estas se trabajarán en formato JSON. Este comprobará también la existencia del usuario,
 * en el caso de ser un usuario nuevo creará un nuevo directorio para el mismo.
 * @param user Usuario que crea la nota.
 * @param note Objeto nota con todas las características de la misma. 
 */
export function addNewNote(user: string, note: Note) {  
  
  let title: string = spacesToBars(note.getTitle())
  let userRoute: string = "notes/" + user;
  let fileRoute: string = "notes/" + user + "/" + title + ".json";
  
  if (fs.existsSync(userRoute)) { 
    if (fs.existsSync(fileRoute)) { 
      console.log(chalk.red("Error: la nota ya existe."));
    }
    else { 
      let JSONtext = {"user": user, "title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
      let JSONstring: string = JSON.stringify(JSONtext);
      fs.writeFileSync(fileRoute, JSONstring);
    }
  }
  else {
    fs.mkdirSync(userRoute); 
    let JSONtext = {"user": user, "title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
    let JSONstring: string = JSON.stringify(JSONtext);
    fs.writeFileSync(fileRoute, JSONstring);
  }
}

/**
 * El método listNotes mostrará una lista con los nombres de las notas de un usuario en concreto. Se mostrará el título de la misma con su color correspondiente
 * @param user Usuario de las notas que se mostrarán.
 */
export function listNotes(user: string) {
  let userRoute: string = "notes/" + user;
  
  if (fs.existsSync(userRoute)) {
    let notes = fs.readdirSync(userRoute);
    for (let n of notes) {
      let fileRoute: string = "notes/" + user + "/" + n;
      let fileContent = fs.readFileSync(fileRoute, "utf-8");
      let JSONfile = JSON.parse(fileContent);
      let note = new Note(JSONfile["title"], JSONfile["text"], JSONfile["color"]);
      note.printTitle();
    }
  }
  else {
    console.log(chalk.red("Error. El usuario no existe"))
  }
}

/**
 * Este método mostrará por pantalla la nota que le indiquemos.
 * @param user Usuario dueño de la nota.
 * @param title Título de la nota.
 */
export function readNotes(user: string, title: string) {
  let auxtitle: string = spacesToBars(title)
  let userRoute: string = "notes/" + user;
  let fileRoute: string = "notes/" + user + "/" + auxtitle + ".json";

  if (fs.existsSync(userRoute)) {
    if (fs.existsSync(fileRoute)) {
      let fileContent = fs.readFileSync(fileRoute, "utf-8");
      let JSONfile = JSON.parse(fileContent);
      let note = new Note(JSONfile["title"], JSONfile["text"], JSONfile["color"]);
      note.printTitle();
      note.printText();
    }
    else {
      console.log(chalk.red("Error. La nota no existe"))
    }
  }
  else {
    console.log(chalk.red("Error. El usuario no existe"))
  }
}

/**
 * El método eliminará la nota que le indiquemos.
 * @param user Usuario dueño de la nota.
 * @param title Título de la nota.
 */
export function removeNotes(user: string, title: string) {
  
  let auxtitle: string = spacesToBars(title)
  let userRoute: string = "notes/" + user;
  let fileRoute: string = "notes/" + user + "/" + auxtitle + ".json";

  if (fs.existsSync(userRoute)) {
    if (fs.existsSync(fileRoute)) {
      fs.rmSync(fileRoute);
    }
    else
      console.log(chalk.red("Error. La nota no existe"))
  }
  else {
    console.log(chalk.red("Error. El usuario no existe"))
  }
}

/**
 * Este método realizará una modificacion de la nota que se indique. Se sustituirán los datos de la nota antigua por la nueva.
 * @param user Usuario dueño de la nota.
 * @param note Objeto tipo Note con todas las características de la nota nueva.
 */
export function modifyNote(user: string, note: Note) {

  let auxtitle: string = spacesToBars(note.getTitle())
  let userRoute: string = "notes/" + user;
  let fileRoute: string = "notes/" + user + "/" + auxtitle + ".json";

  if (fs.existsSync(userRoute)) {
    if (fs.existsSync(fileRoute)) {
      removeNotes(user, note.getTitle());
      addNewNote(user, note);
    }
    else {
      console.log(chalk.red("Error. La nota no existe"))
    }
  }
  else {
    console.log(chalk.red("Error. El usuario no existe"))
  }
}