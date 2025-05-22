import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { UpdateProductionModuleModalProps } from '.';

const atomUpdateProductionModuleModal = atom<Omit<
  UpdateProductionModuleModalProps,
  'onClose'
> | null>(null);

export const useUpdateProductionModuleModal = () =>
  useAtom(atomUpdateProductionModuleModal);

export const useUpdateProductionModuleModalValue = () =>
  useAtomValue(atomUpdateProductionModuleModal);

export const useSetUpdateProductionModuleModal = () =>
  useSetAtom(atomUpdateProductionModuleModal);