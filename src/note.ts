import * as chalk from 'chalk';

export class Note {
  constructor(private title: string,  private text: string, private color: string){
  }

  getTitle() {
    return this.title;
  }

  getText() {
    return this.text;
  }

  getColor() {
    return this.color;
  }

  printTitle() {
    if (this.color == "Red" || this.color == "red")
      console.log(chalk.italic.black.bgRed(this.title));
    else if (this.color == "Green" || this.color == "green")
      console.log(chalk.italic.black.bgGreen(this.title));
    else if (this.color == "Yellow" || this.color == "yellow")
      console.log(chalk.italic.black.bgYellow(this.title));    
    else if (this.color == "Blue" || this.color == "blue")
      console.log(chalk.italic.black.bgBlue(this.title));
    else
      console.log(chalk.red("Error. El color elegido no existe."));
  }

  printText() {
    if (this.color == "Red" || this.color == "red")
      console.log(chalk.italic.black.bgRed(this.text));
    else if (this.color == "Green" || this.color == "green")
      console.log(chalk.italic.black.bgGreen(this.text));
    else if (this.color == "Yellow" || this.color == "yellow")
      console.log(chalk.italic.black.bgYellow(this.text));    
    else if (this.color == "Blue" || this.color == "blue")
      console.log(chalk.italic.black.bgBlue(this.text));
    else
      console.log(chalk.red("Error. El color elegido no existe."));
  }
}


