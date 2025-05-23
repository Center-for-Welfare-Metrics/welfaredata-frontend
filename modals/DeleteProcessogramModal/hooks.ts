import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { DeleteProcessogramModalProps } from '.';

const atomDeleteProcessogramModal = atom<Omit<
  DeleteProcessogramModalProps,
  'onClose'
> | null>(null);

export const useDeleteProcessogramModal = () =>
  useAtom(atomDeleteProcessogramModal);

export const useDeleteProcessogramModalValue = () =>
  useAtomValue(atomDeleteProcessogramModal);

export const useSetDeleteProcessogramModal = () =>
  useSetAtom(atomDeleteProcessogramModal);