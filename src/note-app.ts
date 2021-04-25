import * as fs from 'fs';
import * as chalk from 'chalk';
import * as yargs from 'yargs';
import { Note } from './note';

// type Color = "Red" | "Green" | "Yellow" | "Blue"

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

function spacesToBars(title: string): string {
  
  let auxString: string = "";

  for (let char of title) {
    if (char == " ")
      auxString += "_"
    else
      auxString += char;
  }

  return auxString;
}

function addNewNote(user: string, note: Note) {  
  
  let title: string = spacesToBars(note.getTitle())
  let userRoute: string = "notes/" + user;
  let fileRoute: string = "notes/" + user + "/" + title + ".json";
  
  if (fs.existsSync(userRoute)) { // El usuario existe
    if (fs.existsSync(fileRoute)) { // La nota existe, salta un error
      console.log(chalk.red("Error: la nota ya existe."));
    }
    else { // La nota no existe, se crea
      let JSONtext = {"user": user, "title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
      let JSONstring: string = JSON.stringify(JSONtext);
      fs.writeFileSync(fileRoute, JSONstring);
    }
  }
  else { // El usuario no existe
    fs.mkdirSync(userRoute); // Se crea el directorio
    let JSONtext = {"user": user, "title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
    let JSONstring: string = JSON.stringify(JSONtext);
    fs.writeFileSync(fileRoute, JSONstring); // Se crea la nota
  }
}

function listNotes(user: string) {
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

function readNotes(user: string, title: string) {
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

function removeNotes(user: string, title: string) {
  
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

function modifyNote(user: string, note: Note) {

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