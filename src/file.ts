import * as fs from 'fs';
import {spawn} from 'child_process';
import * as chalk from 'chalk';

let route: string = "notes/";
let newChar: number = 0;
let oldChar: number = 0;
let greaterChar = new Map<string,number>()

if (fs.existsSync(route)) {
  let files = fs.readdirSync(route);

  for (let f of files){
    let fileRoute: string = route + f;
    let fileContent = fs.readFileSync(fileRoute, "utf-8");
    const wc = spawn('wc', [fileRoute]);
    let wcOutput = '';
    wc.stdout.on('data', (piece) => wcOutput += piece);

    wc.on('close', () => {
      const wcOutputAsArray = wcOutput.split(/\s+/);
      let lines: string = wcOutputAsArray[1]
      let words: string = wcOutputAsArray[2]
      let characters: string = wcOutputAsArray[3]
      newChar = parseInt(characters);
      writeText(f, lines, words, characters, fileContent);
      greaterChar = greaterCharacters(f);
    });
  } 
  printCharacter(greaterChar);
}
else {
  console.log(chalk.red("Error. El directorio no existe"));
}


function writeText(file: string, lines: string, words: string, characters: string, content: string) {
  file = chalk.magenta(file);
  let routeColor = chalk.magenta(route);
  console.log(`Contenido del archivo ${file} del directorio ${routeColor}`);
  console.log(content);
  console.log("------------------------------------------------------------------");
  console.log(chalk.blue(`Lineas:  ${lines}`));
  console.log(chalk.blue(`Palabras:  ${words}`));
  console.log(chalk.blue(`Caracteres:  ${characters}`));
  console.log("------------------------------------------------------------------");
}

function greaterCharacters(name: string) {
  
  let aux = new Map<string,number>()

  if (oldChar < newChar) {
    aux.set(name,newChar);
  }
  else {
    aux.set(name,newChar);
  }

  return aux;
}


function printCharacter(aux: Map<string,number>) { 
  for (let char of aux){
    console.log("Nombre: ", char[0])
    console.log("Número de caracteres: ", char[1])
  }
}