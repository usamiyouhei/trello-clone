import api from "../../lib/api";
import { Card } from "./card.entity";

export const cardRepository = {
  async create(listId: string, title: string) {
    const result = await api.post('/cards', { listId, title });
    return new Card(result.data)
  }
}