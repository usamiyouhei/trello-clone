import { atom } from "jotai";
import { User } from "../users/user.entity";

export const currentUserAtom = atom<User>();
 // const [currentUser, setcurrentUser] = useAtom(currentUserAtom);
 //. ↓ 設定したものも取り出せる
 // const currentUser = useAtomValue(currentUserAtom);
 // const setCurrentUser = useSetAtom(currentUserAtom);
