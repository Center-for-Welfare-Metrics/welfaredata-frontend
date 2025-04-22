import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CreateSpecieModalProps } from ".";

const atomCreateSpecieModal = atom<Omit<
  CreateSpecieModalProps,
  "onClose"
> | null>(null);

export const useCreateSpecieModal = () => useAtom(atomCreateSpecieModal);

export const useCreateSpecieModalValue = () =>
  useAtomValue(atomCreateSpecieModal);

export const useSetCreateSpecieModal = () => useSetAtom(atomCreateSpecieModal);
