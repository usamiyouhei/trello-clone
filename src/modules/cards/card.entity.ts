

export class Card {
  id!: string;
  title!: string;
  position!: number;
  description!: string;
  dueDate?: string;
  completed!: boolean;
  listId!: string;


  constructor(data: Card) {
    Object.assign(this, data)
  }
}