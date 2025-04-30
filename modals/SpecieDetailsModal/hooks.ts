import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { SpecieDetailsModalProps } from '.';

const atomSpecieDetailsModal = atom<Omit<
  SpecieDetailsModalProps,
  'onClose'
> | null>(null);

export const useSpecieDetailsModal = () =>
  useAtom(atomSpecieDetailsModal);

export const useSpecieDetailsModalValue = () =>
  useAtomValue(atomSpecieDetailsModal);

export const useSetSpecieDetailsModal = () =>
  useSetAtom(atomSpecieDetailsModal);