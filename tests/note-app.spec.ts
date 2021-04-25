import 'mocha';
import {expect} from 'chai';
import { Note } from '../src/note';
import * as noteApp from '../src/note-app';

let noteRed = new Note("Título rojo", "Soy una nota roja", "Red")
let noteGreen = new Note("Título verde", "Soy una nota verde", "Green")
let noteYellow = new Note("Título amarillo", "Soy una nota amarilla", "Yellow")
let noteBlue = new Note("Título azul", "Soy una nota azul", "Blue")

describe('Comprobación del método spacestoBars()', () => {
  it('Comprobación de que convierte correctamente las cadenas', () => {
    expect(noteApp.spacesToBars(noteRed.getTitle())).to.be.equal("Título_rojo");
  });
});

describe('Comprobación del método addNewNote()', () => {
  // La carpeta para el usuario "ccolivares" esta precreada
  it('Comprobación del correcto funcionamiento con un usuario ya existente', () => {
    noteApp.addNewNote("ccolivares", noteRed);
  });
  it('Comprobación del correcto funcionamiento con nuevo usuario', () => {
    noteApp.addNewNote("spicca", noteGreen);
  });
  it('Comprobación de que falla si ya existe la nota', () => {
    noteApp.addNewNote("ccolivares", noteRed);
  });
});

describe('Comprobación del método listNotes()', () => {
  it('Comprobación del correcto funcionamiento', () => {
    noteApp.listNotes("ccolivares");
  });
  it('Comprobación de que el usuario no existe', () => {
    noteApp.listNotes("edusegre");
  });
});

describe('Comprobación del método readNotes()', () => {
  it('Comprobación del correcto funcionamiento', () => {
    noteApp.readNotes("ccolivares", noteRed.getTitle());
  });
  it('Comprobación de que el usuario no existe', () => {
    noteApp.readNotes("edusegre", noteRed.getTitle());
  });
  it('Comprobación de que la nota no existe', () => {
    noteApp.readNotes("ccolivares", "Título auxiliar");
  });
});

describe('Comprobación del método removeNotes()', () => {
  it('Comprobación del correcto funcionamiento', () => {
    noteApp.removeNotes("ccolivares", noteRed.getTitle());
  });
  it('Comprobación de que el usuario no existe', () => {
    noteApp.removeNotes("edusegre", noteRed.getTitle());
  });
  it('Comprobación de que la nota no existe', () => {
    noteApp.removeNotes("ccolivares", "Título auxiliar");
  });
});

describe('Comprobación del método modifyNote()', () => {
  it('Comprobación del correcto funcionamiento', () => {
    noteApp.modifyNote("spicca", noteGreen);
  });
  it('Comprobación de que el usuario no existe', () => {
    noteApp.modifyNote("edusegre", noteBlue);
  });
  it('Comprobación de que la nota no existe', () => {
    noteApp.modifyNote("ccolivares", noteYellow);
  });
});
