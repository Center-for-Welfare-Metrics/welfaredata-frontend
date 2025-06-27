import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ProductionModuleCardSize } from "./const";
import { useSetDeleteProductionModuleModal } from "modals/DeleteProductionModuleModal/hooks";
import { useSetUpdateProductionModuleModal } from "modals/UpdateProductionModuleModal/hooks";
import { Edit, Trash } from "react-feather";
import { ImageMosaic } from "@/components/ImageMosaic";

type Props = {
  _id: string;
  name: string;
  specie_id: string;
  description: string | undefined;
  processogramsCount: number;
  processograms_urls: string[] | undefined;
};

export const ProductionModuleCard = ({
  _id,
  name,
  description,
  specie_id,
  processogramsCount,
  processograms_urls,
}: Props) => {
  const setDeleteProductionModule = useSetDeleteProductionModuleModal();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteProductionModule({
      productionModuleId: _id,
      productionModuleName: name,
    });
  };

  const setUpdateProductionModule = useSetUpdateProductionModuleModal();

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setUpdateProductionModule({
      productionModule: {
        _id,
        name,
        description,
        specie_id,
      },
    });
  };

  return (
    <LinkContainer
      href={{
        pathname: "/admin/production_modules/[id]",
        query: {
          id: _id,
        },
      }}
    >
      {processograms_urls && (
        <MosaicWrapper>
          {" "}
          <ImageMosaic urls={processograms_urls} className="mosaic" />
        </MosaicWrapper>
      )}
      <BackDrop />
      <Container>
        <FlexRow justify="space-between">
          <Info>
            <FlexColumn gap={0}>
              <Text variant="body2">{name}</Text>
            </FlexColumn>
          </Info>
          <Info>
            <FlexColumn gap={0} align="flex-end">
              <Text variant="body2">{processogramsCount} processograms</Text>
            </FlexColumn>
          </Info>
        </FlexRow>
        <ActionButtons>
          <FlexRow>
            <IconWrapper onClick={handleUpdate}>
              <Edit color={ThemeColors.white} size={16} />
            </IconWrapper>
            <IconWrapper onClick={handleDelete}>
              <Trash color={ThemeColors.red} size={16} />
            </IconWrapper>
          </FlexRow>
        </ActionButtons>
      </Container>
    </LinkContainer>
  );
};

const IconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const BackDrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: color-mix(in srgb, ${ThemeColors.black}, transparent 50%);
  backdrop-filter: blur(2px);
`;

const MosaicWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease-in-out;
`;

const Info = styled.div`
  background-color: ${ThemeColors.black};
`;

const Container = styled.div`
  width: ${ProductionModuleCardSize.width}px;
  height: ${ProductionModuleCardSize.height}px;
  border-radius: 4px;
  border: 1px solid ${ThemeColors.grey_300};
  padding: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  transition: border 0.25s ease-in-out;

  &:hover {
    border: 1px solid ${ThemeColors.grey_800};

    ${ActionButtons} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const LinkContainer = styled(Link)`
  &:hover {
    .mosaic {
      opacity: 1;
    }
  }
  position: relative;
  text-decoration: none;
`;
