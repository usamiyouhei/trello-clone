import api from "../../lib/api";
import { User } from "../users/user.entity";

export const authRepository = {
  async signup(
    name: string, 
    email: string, 
    password: string
  ): Promise<{ user: User; token:string}> {
    //http://localhost:8888/auth/api
    console.log({ name, email, password });
    const result = await api.post("/auth/signup", { name, email, password });
    const { user, token } = result.data;
    return{ user: new User(user), token }
  },
  async signin(
    email: string, 
    password: string
  ): Promise<{ user: User; token:string}>{
    const result = await api.post('/auth/signin',{ email, password })
    const { user, token } = result.data;
    return{ user: new User(user), token }
  }
}