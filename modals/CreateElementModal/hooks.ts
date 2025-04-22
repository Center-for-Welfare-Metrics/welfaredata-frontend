import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CreateElementModalProps } from ".";

const atomCreateElementModal = atom<Omit<
  CreateElementModalProps,
  "onClose"
> | null>(null);

export const useCreateElementModal = () => useAtom(atomCreateElementModal);

export const useCreateElementModalValue = () =>
  useAtomValue(atomCreateElementModal);

export const useSetCreateElementModal = () =>
  useSetAtom(atomCreateElementModal);
