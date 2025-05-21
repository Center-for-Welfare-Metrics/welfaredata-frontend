import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { UpdateSpecieModalProps } from '.';

const atomUpdateSpecieModal = atom<Omit<
  UpdateSpecieModalProps,
  'onClose'
> | null>(null);

export const useUpdateSpecieModal = () =>
  useAtom(atomUpdateSpecieModal);

export const useUpdateSpecieModalValue = () =>
  useAtomValue(atomUpdateSpecieModal);

export const useSetUpdateSpecieModal = () =>
  useSetAtom(atomUpdateSpecieModal);