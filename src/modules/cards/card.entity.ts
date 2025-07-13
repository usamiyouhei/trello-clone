

export class Card {
  id!: string;
  title!: string;
  description!: string;
  dueDate?: string;
  completed!: boolean;
  listId!: string;

  constructor(data: Card) {
    Object.assign(this, data)
  }
}