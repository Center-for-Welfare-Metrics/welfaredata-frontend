import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import { transparentize } from "polished";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ProductionModuleCardSize } from "./const";
import { useSetDeleteProductionModuleModal } from "modals/DeleteProductionModuleModal/hooks";
import { useSetUpdateProductionModuleModal } from "modals/UpdateProductionModuleModal/hooks";
import { Edit, Trash } from "react-feather";

type Props = {
  _id: string;
  name: string;
  specie_id: string;
  description: string | undefined;
  image_url: string | undefined;
};

export const ProductionModuleCard = ({
  _id,
  name,
  description,
  specie_id,
  image_url,
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
    <Link
      href={{
        pathname: "/admin/production_modules/[id]",
        query: {
          id: _id,
        },
      }}
      style={{
        textDecoration: "none",
      }}
    >
      <Container
        style={
          image_url
            ? {
                backgroundImage: `url(${image_url})`,
              }
            : undefined
        }
      >
        <Info>
          <FlexColumn gap={0}>
            <Text variant="body2">{name}</Text>
          </FlexColumn>
        </Info>
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
    </Link>
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

const ActionButtons = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease-in-out;
`;

const Info = styled.div`
  background-color: ${transparentize(0.3, ThemeColors.black)};
`;

const Container = styled.div`
  width: ${ProductionModuleCardSize.width}px;
  height: ${ProductionModuleCardSize.height}px;
  border-radius: 4px;
  border: 1px solid ${ThemeColors.deep_blue};
  padding: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  transition: border 0.25s ease-in-out;

  &:hover {
    border: 1px solid ${ThemeColors.blue};

    ${ActionButtons} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;
