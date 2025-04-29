import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ElementDetailsModalProps } from '.';

const atomElementDetailsModal = atom<Omit<
  ElementDetailsModalProps,
  'onClose'
> | null>(null);

export const useElementDetailsModal = () =>
  useAtom(atomElementDetailsModal);

export const useElementDetailsModalValue = () =>
  useAtomValue(atomElementDetailsModal);

export const useSetElementDetailsModal = () =>
  useSetAtom(atomElementDetailsModal);