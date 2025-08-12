import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import styled, { css } from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { SpecieCardSize } from "./const";
import { Edit, Trash } from "react-feather";
import { useSetDeleteSpecieModal } from "modals/DeleteSpecieModal/hooks";
import { useSetUpdateSpecieModal } from "modals/UpdateSpecieModal/hooks";
import { ImageMosaic } from "@/components/ImageMosaic";
import { useMemo } from "react";

type Props = {
  _id: string;
  name: string;
  pathname: string;
  description: string | undefined;
  productionModulesCount: number;
  processogramsCount: number;
  processogram_urls: { url: string; theme: "light" | "dark" }[] | undefined;
  disablePermissions?: boolean;
  redirectToPublicPath?: boolean;
  fullWidth?: boolean;
};

export const SpecieCard = ({
  _id,
  name,
  pathname,
  processogramsCount,
  productionModulesCount,
  description,
  processogram_urls,
  disablePermissions,
  redirectToPublicPath,
  fullWidth,
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
    if (pathname === undefined) return;
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

  const href = useMemo(() => {
    if (redirectToPublicPath) {
      return {
        pathname: "/[pathname]",
        query: {
          pathname,
        },
      };
    }

    return {
      pathname: "/admin/species/[id]",
      query: {
        id: _id,
      },
    };
  }, [redirectToPublicPath, _id, pathname]);

  return (
    <LinkContainer
      href={href}
      style={{
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {processogram_urls && (
        <MosaicWrapper>
          {" "}
          <ImageMosaic urls={processogram_urls} className="mosaic" />
        </MosaicWrapper>
      )}
      <BackDrop />
      <Container $fullWidth={fullWidth}>
        <FlexRow justify="space-between">
          <Info>
            <FlexColumn gap={0}>
              <Text variant="body2">{name}</Text>
              {pathname && <Text variant="body2">/{pathname}</Text>}
            </FlexColumn>
          </Info>
          <Info>
            <FlexColumn gap={0} align="flex-end">
              <Text variant="body2">
                {productionModulesCount} production modules
              </Text>
              <Text variant="body2">{processogramsCount} processograms</Text>
            </FlexColumn>
          </Info>
        </FlexRow>
        {!disablePermissions && (
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
        )}
      </Container>
    </LinkContainer>
  );
};

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
  background-color: ${ThemeColors.black};
`;

type ContainerProps = {
  $fullWidth?: boolean;
};

const Container = styled.div<ContainerProps>`
  ${({ $fullWidth }) =>
    $fullWidth
      ? css`
          width: 100%;
          height: ${SpecieCardSize.height * 1.5}px;
        `
      : css`
          width: ${SpecieCardSize.width}px;
          height: ${SpecieCardSize.height}px;
        `}

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
