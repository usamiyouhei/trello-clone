import { atom } from "jotai";
import { Card } from "./card.entity";


export const cardsAtom = atom<Card[]>([])