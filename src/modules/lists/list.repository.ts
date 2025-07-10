import api from "../../lib/api";
import { List } from "./lists.entity";

export class User {
  async create(boardId: string, title: string):Promise<List> {
    const result = await api.post('/lists', { boardId, title });
    return new List(result.data);
  }
}