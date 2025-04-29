import { useGetElementDataBySvgElementID } from "@/api/react-query/elements-data/useGetElementsData";
import { useGetElementById } from "@/api/react-query/svg-elements/useGetSvgElements";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { ProgressogramHud } from "@/components/processograms/Hud";
import { ProcessogramComplete } from "@/components/processograms/ProcessogramsList/components/ProcessogramLoader/components/ProcessogramComplete";
import { getElementNameFromId } from "@/components/processograms/utils/extractInfoFromId";
import { Text } from "@/components/Text";
import { useSetElementDetailsModal } from "modals/ElementDetailsModal/hooks";
import Link from "next/link";
import { useState } from "react";
import { Info, RefreshCw } from "react-feather";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ElementStatus } from "types/elements";

type Props = {
  element_id: string;
};

export const ElementDetail = ({ element_id }: Props) => {
  const [currentElement, setCurrentElement] = useState<string | null>(null);

  const {
    data: element,
    isLoading,
    refetch,
    isFetching,
  } = useGetElementById({
    element_id,
  });

  const {
    data: elementData,
    refetch: dataRefetch,
    isFetching: isFetchingData,
  } = useGetElementDataBySvgElementID({
    element_id,
  });

  const setElementDetailsModal = useSetElementDetailsModal();

  const openElementDetailsModal = () => {
    if (!element) return;
    if (!elementData) return;

    setElementDetailsModal({
      element: {
        finalSize: element.finalSize,
        originalSize: element.originalSize,
        elementsCount: Object.keys(elementData.data).length,
        createdAt: element.createdAt,
      },
    });
  };

  const handleChange = (id: string) => {
    setCurrentElement(id);
  };

  const handleRefetch = (e: React.MouseEvent) => {
    e.stopPropagation();
    refetch();
  };

  const handleDataRefetch = (e: React.MouseEvent) => {
    e.stopPropagation();
    dataRefetch();
  };

  const getStatusText = (status: ElementStatus) => {
    switch (status) {
      case "processing":
        return "Element is processing, please wait";
      case "ready":
        return "Element is ready";
      case "error":
        return "Something wrong happened with the element";
      case "generating":
        return "Element is generating AI content, please wait";
      default:
        return "";
    }
  };

  if (isLoading)
    return (
      <>
        <ClipLoader color={ThemeColors.white} size={24} />
      </>
    );

  if (!element) return <></>;

  return (
    <Container width="100%" gap={0} mt={2}>
      <FlexRow justify="flex-start">
        <Link href="/admin">
          <Text variant="h2">Species</Text>
        </Link>
        <Text variant="h2">{">"}</Text>
        <Link href={`/admin/species/${element.specie_id}`}>
          <Text variant="h2">{element.specie?.name ?? "--"}</Text>
        </Link>
        <Text variant="h2">{">"}</Text>
        <Text variant="h3">{element.name}</Text>
        <FlexColumn>
          {isFetchingData ? (
            <ClipLoader size={18} color={ThemeColors.white} loading />
          ) : (
            <IconWrapper>
              <RefreshCw
                color={ThemeColors.white}
                cursor="pointer"
                size={18}
                onClick={handleDataRefetch}
              />
            </IconWrapper>
          )}
        </FlexColumn>
        <IconWrapper>
          <Info
            size={18}
            color={ThemeColors.white}
            cursor="pointer"
            onClick={openElementDetailsModal}
          />
        </IconWrapper>
      </FlexRow>
      {element.status === "ready" || element.status === "generating" ? (
        <>
          <div
            style={{
              marginTop: "2rem",
              height: "70vh",
              position: "relative",
            }}
          >
            <FlexRow height={"100%"}>
              <ProgressogramHud
                notReady={element.status === "generating"}
                currentElement={
                  currentElement || getElementNameFromId(element.identifier)
                }
                data={elementData?.data ?? {}}
              />
              <FlexColumn
                height="100%"
                width="100%"
                justify="center"
                style={{
                  overflow: "hidden",
                }}
              >
                <ProcessogramComplete
                  src={element.svg_url}
                  rasterImages={element.raster_images}
                  enableBruteOptimization={false}
                  onChange={handleChange}
                  onClose={() => {}}
                  maxHeight="70vh"
                />
              </FlexColumn>
            </FlexRow>
          </div>
        </>
      ) : (
        <>
          <FlexRow justify="flex-start" align="center" mt={2}>
            <Text variant="h3">{getStatusText(element.status)}</Text>
            {isFetching ? (
              <ClipLoader size={18} color={ThemeColors.white} loading />
            ) : (
              <IconWrapper>
                <RefreshCw
                  color={ThemeColors.white}
                  cursor="pointer"
                  size={18}
                  onClick={handleRefetch}
                />
              </IconWrapper>
            )}
          </FlexRow>
        </>
      )}
    </Container>
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

const Container = styled(FlexColumn)`
  padding-inline: 4rem;
  svg {
    [id*="--"] {
      cursor: pointer;
    }
  }
`;
