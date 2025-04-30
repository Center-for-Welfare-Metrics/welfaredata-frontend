import { CreateSpecieModalWrapper } from './CreateSpecieModal';
import { CreateElementModalWrapper } from './CreateElementModal';
import { ElementDetailsModalWrapper } from './ElementDetailsModal';
import { SpecieDetailsModalWrapper } from './SpecieDetailsModal';

export const Modals = () => {
  return (
    <>
      <CreateSpecieModalWrapper />
      <CreateElementModalWrapper />
      <ElementDetailsModalWrapper />
      <SpecieDetailsModalWrapper />
    </>
  );
};
