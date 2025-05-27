import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import { transparentize } from "polished";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ProcessogramCardSize } from "./const";
import { useMemo } from "react";
import { ProcessogramStatus } from "types/processogram";
import { useSetDeleteProcessogramModal } from "modals/DeleteProcessogramModal/hooks";
import { useSetUpdateProcessogramModal } from "modals/UpdateProcessogramModal/hooks";
import { Edit, Trash } from "react-feather";

type Props = {
  _id: string;
  name: string;
  production_module_id: string;
  specie_id: string;
  description: string | undefined;
  theme: "dark" | "light";
  status: ProcessogramStatus;
  image_url: string | undefined;
  is_published: boolean;
};

export const ProcessogramCard = ({
  _id,
  name,
  image_url,
  status,
  description,
  production_module_id,
  specie_id,
  theme,
  is_published,
}: Props) => {
  const statusColor = useMemo(() => {
    if (status === "error") return ThemeColors.red;

    if (status === "ready") return ThemeColors.green;

    if (status === "processing") return ThemeColors.yellow;

    if (status === "generating") return ThemeColors.gray;
  }, [status]);

  const statusText = useMemo(() => {
    switch (status) {
      case "processing":
        return "Processing elements";
      case "ready":
        return "Ready to use";
      case "error":
        return "Error";
      case "generating":
        return "Generating AI content";
      default:
        return "";
    }
  }, [status]);

  const setDeleteProcessogram = useSetDeleteProcessogramModal();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteProcessogram({
      processogramId: _id,
      processogramName: name,
    });
  };

  const setUpdateProcessogram = useSetUpdateProcessogramModal();

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setUpdateProcessogram({
      processogram: {
        _id,
        name,
        production_module_id,
        specie_id,
        theme,
        description,
        is_published,
      },
    });
  };

  return (
    <Link
      href={{
        pathname: "/admin/processograms/[id]",
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
            <Text variant="body2" customColor={statusColor}>
              Status : {statusText}
            </Text>
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
  width: ${ProcessogramCardSize.width}px;
  height: ${ProcessogramCardSize.height}px;
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
