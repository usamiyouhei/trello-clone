

export class List {
  id!: string;
  title!: string;
  position!: number;
  

  constructor(data: List) {
    Object.assign(this, data)
  }
}