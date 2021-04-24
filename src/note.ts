//import * as fs from 'fs';
//import * as chalk from 'chalk';
//import * as yargs from 'yargs';

type Color = "Red" | "Green" | "Yellow" | "Blue"


export class Note {
  constructor(private title: string,  private text: string, private color: Color){
  }

  getTitle() {
    return this.title
  }

  getText() {
    return this.text
  }

  getColor() {
    return this.color
  }
}

console.log("Estoy funcionando");
