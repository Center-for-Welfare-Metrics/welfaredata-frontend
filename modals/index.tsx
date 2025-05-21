import { CreateSpecieModalWrapper } from './CreateSpecieModal';
import { CreateProcessogramModalWrapper } from './CreateProcessogramModal';
import { ProcessogramDetailsModalWrapper } from './ProcessogramDetailsModal';
import { SpecieDetailsModalWrapper } from './SpecieDetailsModal';
import { CreateProductionModuleModalWrapper } from './CreateProductionModuleModal';
import { UpdateSpecieModalWrapper } from './UpdateSpecieModal';
import { DeleteSpecieModalWrapper } from './DeleteSpecieModal';

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
    </>
  );
};
