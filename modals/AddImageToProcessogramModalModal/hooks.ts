import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { AddImageToProcessogramModalModalProps } from '.';

const atomAddImageToProcessogramModalModal = atom<Omit<
  AddImageToProcessogramModalModalProps,
  'onClose'
> | null>(null);

export const useAddImageToProcessogramModalModal = () =>
  useAtom(atomAddImageToProcessogramModalModal);

export const useAddImageToProcessogramModalModalValue = () =>
  useAtomValue(atomAddImageToProcessogramModalModal);

export const useSetAddImageToProcessogramModalModal = () =>
  useSetAtom(atomAddImageToProcessogramModalModal);