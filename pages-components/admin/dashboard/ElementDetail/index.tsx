import { useGetElementDataBySvgElementID } from "@/api/react-query/elements-data/useGetElementsData";
import { useGetElementById } from "@/api/react-query/svg-elements/useGetSvgElements";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { ProgressogramHud } from "@/components/processograms/Hud";
import { ProcessogramComplete } from "@/components/processograms/ProcessogramsList/components/ProcessogramLoader/components/ProcessogramComplete";
import { getElementNameFromId } from "@/components/processograms/utils/extractInfoFromId";
import { Text } from "@/components/Text";
import { Portal } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RefreshCw } from "react-feather";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ElementStatus } from "types/elements";

type Props = {
  element_id: string;
};

export const ElementDetail = ({ element_id }: Props) => {
  const { data, isLoading, refetch, isFetching } = useGetElementById({
    element_id,
  });

  const { data: elementData } = useGetElementDataBySvgElementID({
    element_id,
  });

  const [currentElement, setCurrentElement] = useState<string | null>(null);

  const handleChange = (id: string) => {
    setCurrentElement(id);
  };

  const handleRefetch = () => {
    refetch();
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

  if (!data) return <></>;

  return (
    <Container width="100%" gap={0} mt={2}>
      <FlexRow justify="flex-start">
        <Link href="/admin">
          <Text variant="h2">Species</Text>
        </Link>
        <Text variant="h2">{">"}</Text>
        <Link href={`/admin/species/${data.specie_id}`}>
          <Text variant="h2">{data?.specie?.name ?? "--"}</Text>
        </Link>
        <Text variant="h2">{">"}</Text>
        <Text variant="h3">{data.name}</Text>
      </FlexRow>
      {data.status === "ready" || data.status === "generating" ? (
        <>
          <div
            style={{
              height: "70vh",
              position: "relative",
            }}
          >
            <FlexRow height={"100%"}>
              <FlexColumn
                height="100%"
                width="100%"
                justify="center"
                style={{
                  overflow: "hidden",
                }}
              >
                <ProcessogramComplete
                  src={data.svg_url}
                  rasterImages={data.raster_images}
                  enableBruteOptimization={false}
                  onChange={handleChange}
                  onClose={() => {}}
                  maxHeight="70vh"
                />
              </FlexColumn>
              <ProgressogramHud
                notReady={data.status === "generating"}
                currentElement={
                  currentElement || getElementNameFromId(data.identifier)
                }
                data={elementData?.data ?? {}}
              />
            </FlexRow>
          </div>
        </>
      ) : (
        <>
          <FlexRow justify="flex-start" align="center" mt={2}>
            <Text variant="h3">{getStatusText(data.status)}</Text>
            {isFetching ? (
              <ClipLoader size={18} color={ThemeColors.white} loading />
            ) : (
              <RefreshCw
                color={ThemeColors.white}
                cursor="pointer"
                size={18}
                onClick={handleRefetch}
              />
            )}
          </FlexRow>
        </>
      )}
    </Container>
  );
};

const Container = styled(FlexColumn)`
  padding-inline: 4rem;
  svg {
    [id*="--"] {
      cursor: pointer;
    }
  }
`;
