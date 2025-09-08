import { CreateSpecieModalWrapper } from './CreateSpecieModal';
import { CreateProcessogramModalWrapper } from './CreateProcessogramModal';
import { ProcessogramDetailsModalWrapper } from './ProcessogramDetailsModal';
import { SpecieDetailsModalWrapper } from './SpecieDetailsModal';
import { CreateProductionModuleModalWrapper } from './CreateProductionModuleModal';
import { UpdateSpecieModalWrapper } from './UpdateSpecieModal';
import { DeleteSpecieModalWrapper } from './DeleteSpecieModal';
import { UpdateProductionModuleModalWrapper } from './UpdateProductionModuleModal';
import { DeleteProductionModuleModalWrapper } from './DeleteProductionModuleModal';
import { UpdateProcessogramModalWrapper } from './UpdateProcessogramModal';
import { DeleteProcessogramModalWrapper } from './DeleteProcessogramModal';
import { AddImageToProcessogramModalModalWrapper } from './AddImageToProcessogramModalModal';
import { DeleteProcessogramImageConfirmationModalModalWrapper } from './DeleteProcessogramImageConfirmationModalModal';
import { ThemeDialogModalWrapper } from './ThemeDialogModal';

export const Modals = () => {
  return (
    <>
      <CreateSpecieModalWrapper />
      <CreateProcessogramModalWrapper />
      <ProcessogramDetailsModalWrapper />
      <SpecieDetailsModalWrapper />
      <CreateProductionModuleModalWrapper />
      <UpdateSpecieModalWrapper />
      <DeleteSpecieModalWrapper />
      <UpdateProductionModuleModalWrapper />
      <DeleteProductionModuleModalWrapper />
      <UpdateProcessogramModalWrapper />
      <DeleteProcessogramModalWrapper />
      <CreateProcessogramModalWrapper />
      <AddImageToProcessogramModalModalWrapper />
      <DeleteProcessogramImageConfirmationModalModalWrapper />
      <ThemeDialogModalWrapper />
    </>
  );
};
