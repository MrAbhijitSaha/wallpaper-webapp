import { atom } from "jotai";

type LikeState = {
  liked: boolean;
  count: number;
};

export const signinDialogAtom = atom(false);
export const likeStateMapAtom = atom<Record<string, LikeState>>({});
