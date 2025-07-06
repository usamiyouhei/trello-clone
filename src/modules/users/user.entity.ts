

export class User {
  id!: string;
  name!: string;
  email!: string;
  boardId!: string;
  constructor(data: User) {
    Object.assign(this, data)
  }
}