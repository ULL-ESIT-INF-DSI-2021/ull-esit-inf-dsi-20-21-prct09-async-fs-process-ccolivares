

type Color = "Azul" | "Verde" | "Magenta" | "Amarillo"

export class Note {
  constructor(private name: string,  private food: Map<Food, number>, private category: Category){
  }
}