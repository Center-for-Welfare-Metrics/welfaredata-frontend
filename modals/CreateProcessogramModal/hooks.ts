import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CreateProcessogramModalProps } from ".";

const atomCreateElementModal = atom<Omit<
  CreateProcessogramModalProps,
  "onClose"
> | null>(null);

export const useCreateElementModal = () => useAtom(atomCreateElementModal);

export const useCreateElementModalValue = () =>
  useAtomValue(atomCreateElementModal);

export const useSetCreateElementModal = () =>
  useSetAtom(atomCreateElementModal);
