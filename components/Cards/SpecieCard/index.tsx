import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import { transparentize } from "polished";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { SpecieCardSize } from "./const";
import { Edit, Trash } from "react-feather";
import { useSetDeleteSpecieModal } from "modals/DeleteSpecieModal/hooks";
import { useSetUpdateSpecieModal } from "modals/UpdateSpecieModal/hooks";

type Props = {
  _id: string;
  name: string;
  pathname: string;
  description: string | undefined;
  image_url: string | undefined;
};

export const SpecieCard = ({
  _id,
  name,
  pathname,
  image_url,
  description,
}: Props) => {
  const setDeleteSpecieModal = useSetDeleteSpecieModal();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteSpecieModal({
      specieId: _id,
      specieName: name,
    });
  };

  const setUpdateSpecieModal = useSetUpdateSpecieModal();

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setUpdateSpecieModal({
      specie: {
        _id,
        name,
        pathname,
        description,
      },
    });
  };

  return (
    <Link
      href={{
        pathname: "/admin/species/[id]",
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
            <Text variant="body2">/{pathname}</Text>
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
  width: ${SpecieCardSize.width}px;
  height: ${SpecieCardSize.height}px;
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
