import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { DeleteProcessogramImageConfirmationModalModalProps } from '.';

const atomDeleteProcessogramImageConfirmationModalModal = atom<Omit<
  DeleteProcessogramImageConfirmationModalModalProps,
  'onClose'
> | null>(null);

export const useDeleteProcessogramImageConfirmationModalModal = () =>
  useAtom(atomDeleteProcessogramImageConfirmationModalModal);

export const useDeleteProcessogramImageConfirmationModalModalValue = () =>
  useAtomValue(atomDeleteProcessogramImageConfirmationModalModal);

export const useSetDeleteProcessogramImageConfirmationModalModal = () =>
  useSetAtom(atomDeleteProcessogramImageConfirmationModalModal);