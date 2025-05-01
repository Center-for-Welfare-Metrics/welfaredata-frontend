import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ProcessogramDetailsModalProps } from ".";

const atomElementDetailsModal = atom<Omit<
  ProcessogramDetailsModalProps,
  "onClose"
> | null>(null);

export const useElementDetailsModal = () => useAtom(atomElementDetailsModal);

export const useElementDetailsModalValue = () =>
  useAtomValue(atomElementDetailsModal);

export const useSetElementDetailsModal = () =>
  useSetAtom(atomElementDetailsModal);
