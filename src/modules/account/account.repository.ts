import api from "../../lib/api";
import { User } from "../users/user.entity";

export const accountRepository = {
  async updateProfile(name: string): Promise<User> {
    const result = await api.put('/account/profile', { name })
    return new User(result.data);
  },
}