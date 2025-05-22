import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { DeleteProductionModuleModalProps } from '.';

const atomDeleteProductionModuleModal = atom<Omit<
  DeleteProductionModuleModalProps,
  'onClose'
> | null>(null);

export const useDeleteProductionModuleModal = () =>
  useAtom(atomDeleteProductionModuleModal);

export const useDeleteProductionModuleModalValue = () =>
  useAtomValue(atomDeleteProductionModuleModal);

export const useSetDeleteProductionModuleModal = () =>
  useSetAtom(atomDeleteProductionModuleModal);