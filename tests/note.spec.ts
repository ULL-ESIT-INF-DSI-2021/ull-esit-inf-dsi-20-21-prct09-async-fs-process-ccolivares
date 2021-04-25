import 'mocha';
import {expect} from 'chai';
import { Note } from '../src/note';

let noteRed = new Note("Título rojo", "Soy una nota roja", "Red")
let noteGreen = new Note("Título verde", "Soy una nota verde", "Green")
let noteYellow = new Note("Título amarillo", "Soy una nota amarilla", "Yellow")
let noteBlue = new Note("Título azul", "Soy una nota azul", "Blue")


describe('Comprobación de la existencia de un objeto Note', () => {
  it('Comprobación de que un objeto Note pertenece a la clase', () => {
    expect(noteRed).to.be.an.instanceOf(Note);
  });
});

describe('Comprobación de los métodos get', () => {
  it('Comprobación de getTitle()', () => {
    expect(noteRed.getTitle()).eql("Título rojo");
  });
  it('Comprobación de getText()', () => {
    expect(noteRed.getText()).eql("Soy una nota roja");
  });
  it('Comprobación de getTitle()', () => {
    expect(noteRed.getColor()).eql("Red");
  });
});

describe('Comprobación del métodos printTitle()', () => {
  it('Comprobación para el rojo', () => {
    noteRed.printTitle();
  });
  it('Comprobación para el verde', () => {
    noteGreen.printTitle();
  });
  it('Comprobación para el amarillo', () => {
    noteYellow.printTitle();
  });
  it('Comprobación para el azul', () => {
    noteBlue.printTitle();
  });
});

describe('Comprobación del métodos printText()', () => {
  it('Comprobación para el rojo', () => {
    noteRed.printText();
  });
  it('Comprobación para el verde', () => {
    noteGreen.printText();
  });
  it('Comprobación para el amarillo', () => {
    noteYellow.printText();
  });
  it('Comprobación para el azul', () => {
    noteBlue.printText();
  });
});