import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { DeleteSpecieModalProps } from '.';

const atomDeleteSpecieModal = atom<Omit<
  DeleteSpecieModalProps,
  'onClose'
> | null>(null);

export const useDeleteSpecieModal = () =>
  useAtom(atomDeleteSpecieModal);

export const useDeleteSpecieModalValue = () =>
  useAtomValue(atomDeleteSpecieModal);

export const useSetDeleteSpecieModal = () =>
  useSetAtom(atomDeleteSpecieModal);