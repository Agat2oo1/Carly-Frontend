import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const jwtToken = atom<string | undefined>({
  key: "jwtToken",
  default: undefined
})