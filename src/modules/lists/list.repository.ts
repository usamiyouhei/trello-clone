import api from "../../lib/api";
import { List } from "./list.entity";

export const listRepository = {
  async find(boardId: string) {
    const result = await api.get(`/lists/${boardId}`);
    return result.data.map((list: List) => new List(list));
  },
  async create(boardId: string, title: string):Promise<List> {
    const result = await api.post('/lists', { boardId, title });
    return new List(result.data);
  }
}