import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CreateProductionModuleModalProps } from '.';

const atomCreateProductionModuleModal = atom<Omit<
  CreateProductionModuleModalProps,
  'onClose'
> | null>(null);

export const useCreateProductionModuleModal = () =>
  useAtom(atomCreateProductionModuleModal);

export const useCreateProductionModuleModalValue = () =>
  useAtomValue(atomCreateProductionModuleModal);

export const useSetCreateProductionModuleModal = () =>
  useSetAtom(atomCreateProductionModuleModal);