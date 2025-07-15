

export class Card {
  id!: string;
  title!: string;
  position!: number;
  description!: string;
  dueDate?: string;
  completed!: boolean;
  listId!: string;


  constructor(data: Card) {
    Object.assign(this, data);
    if(data.dueDate != null) {
      this.dueDate = new Date(data.dueDate).toLocaleDateString('sv-SE')
    }
  }
}