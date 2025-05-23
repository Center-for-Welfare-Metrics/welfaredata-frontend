import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { UpdateProcessogramModalProps } from '.';

const atomUpdateProcessogramModal = atom<Omit<
  UpdateProcessogramModalProps,
  'onClose'
> | null>(null);

export const useUpdateProcessogramModal = () =>
  useAtom(atomUpdateProcessogramModal);

export const useUpdateProcessogramModalValue = () =>
  useAtomValue(atomUpdateProcessogramModal);

export const useSetUpdateProcessogramModal = () =>
  useSetAtom(atomUpdateProcessogramModal);