import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ThemeDialogModalProps } from '.';

const atomThemeDialogModal = atom<Omit<
  ThemeDialogModalProps,
  'onClose'
> | null>(null);

export const useThemeDialogModal = () =>
  useAtom(atomThemeDialogModal);

export const useThemeDialogModalValue = () =>
  useAtomValue(atomThemeDialogModal);

export const useSetThemeDialogModal = () =>
  useSetAtom(atomThemeDialogModal);