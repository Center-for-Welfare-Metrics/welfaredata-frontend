import { useGetProcessogramDataByProcessogramId } from "@/api/react-query/processogram-datas/useGetProcessogramDatas";
import { useGetProcessogramQuestionsByProcessogramId } from "@/api/react-query/processogram-questions/useGetProcessogramQuestions";
import { useGetProcessogramById } from "@/api/react-query/processograms/useGetProcessograms";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { BreadcrumbHud } from "@/components/processograms/huds/BreadcrumbHud";
import { ProgressogramMainHud } from "@/components/processograms/huds/ProcessogramMainHud";
import {
  ProgressogramQuestionsHud,
  QuestionData,
} from "@/components/processograms/huds/QuestionsHud";
import { ProcessogramComplete } from "@/components/processograms/ProcessogramComplete";
import { EventBus } from "@/components/processograms/ProcessogramComplete/types";
import { getElementNameFromId } from "@/components/processograms/utils/extractInfoFromId";
import { Text } from "@/components/Text";
import { useSetElementDetailsModal } from "modals/ProcessogramDetailsModal/hooks";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Info, RefreshCw } from "react-feather";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ProcessogramHierarchy, ProcessogramStatus } from "types/processogram";

type Props = {
  processogram_id: string;
};

export const ProcessogramDetail = ({ processogram_id }: Props) => {
  const [currentElement, setCurrentElement] = useState<string | null>(null);

  const [currentHierarchy, setHierarchy] = useState<ProcessogramHierarchy[]>(
    []
  );

  const [eventBus, setEventBus] = useState<EventBus | null>(null);

  const {
    data: element,
    isLoading,
    refetch,
    isFetching,
  } = useGetProcessogramById({
    processogram_id,
  });

  const hierarchy = useMemo(() => {
    if (currentHierarchy.length > 0) return currentHierarchy;

    if (!element) return [];

    return [
      {
        id: element.identifier,
        level: "Production System",
        levelNumber: 1,
        name: element.name,
        rawId: element.identifier,
      },
    ];
  }, [currentHierarchy, element]);

  const {
    data: elementData,
    refetch: dataRefetch,
    isFetching: isFetchingData,
  } = useGetProcessogramDataByProcessogramId({
    processogram_id,
  });

  const {
    data: questionsData,
    refetch: questionsRefetch,
    isFetching: isFetchingQuestions,
  } = useGetProcessogramQuestionsByProcessogramId({
    processogram_id,
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

  const handleChange = (id: string, hierarchy: ProcessogramHierarchy[]) => {
    setCurrentElement(id);
    setHierarchy(hierarchy);
  };

  const handleRefetch = (e: React.MouseEvent) => {
    e.stopPropagation();
    refetch();
  };

  const handleDataRefetch = (e: React.MouseEvent) => {
    e.stopPropagation();
    dataRefetch();
    questionsRefetch();
  };

  const getStatusText = (status: ProcessogramStatus) => {
    switch (status) {
      case "processing":
        return "Processogram is processing, please wait";
      case "ready":
        return "Processogram is ready";
      case "error":
        return "Something wrong happened with the Processogram";
      case "generating":
        return "Processogram is generating AI content, please wait";
      default:
        return "";
    }
  };

  const onClose = useCallback(() => {}, []);

  if (isLoading)
    return (
      <>
        <ClipLoader color={ThemeColors.white} size={24} />
      </>
    );

  const onClickBreadcrumb = (id: string) => {
    eventBus?.publish({
      type: "CHANGE_LEVEL",
      payload: {
        id,
      },
    });
  };

  if (!element) return <></>;

  return (
    <Container width="100%" gap={0} mt={2}>
      <FlexRow justify="flex-start">
        <Link href="/admin">
          <Text variant="h2">Dashboard</Text>
        </Link>
        <Text variant="h2">{">"}</Text>
        <Link
          href={{
            pathname: "/admin/species/[id]",
            query: {
              id: element.specie_id,
            },
          }}
        >
          <Text variant="h2">{element.specie?.name ?? "--"}</Text>
        </Link>
        <Text variant="h2">{">"}</Text>
        <Link
          href={{
            pathname: "/admin/production_modules/[id]",
            query: {
              id: element.production_module_id,
            },
          }}
        >
          <Text variant="h2">{element.production_module?.name ?? "--"}</Text>
        </Link>
        <Text variant="h2">{">"}</Text>
        <Text variant="h2">{element.name}</Text>
        <FlexColumn>
          {isFetchingData || isFetchingQuestions ? (
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
            <BreadcrumbsContainer>
              <BreadcrumbHud
                hierarchy={
                  hierarchy ?? [
                    {
                      id: element.identifier,
                      level: "Production System",
                      levelNumber: 1,
                      name: element.name,
                      rawId: element.identifier,
                    },
                  ]
                }
                onClick={onClickBreadcrumb}
              />
            </BreadcrumbsContainer>
            <FlexRow height={"100%"}>
              <ProgressogramMainHud
                notReady={element.status === "generating"}
                currentElement={
                  currentElement || getElementNameFromId(element.identifier)
                }
                data={elementData?.data ?? {}}
              />
              {questionsData && (
                <QuestionsHudContainer>
                  <ProgressogramQuestionsHud
                    notReady={element.status === "generating"}
                    currentElement={
                      currentElement || getElementNameFromId(element.identifier)
                    }
                    data={questionsData?.data ?? {}}
                  />
                </QuestionsHudContainer>
              )}
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
                  eventBusHandler={setEventBus}
                  onClose={onClose}
                  maxHeight="70vh"
                  startFromSpecie={false}
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

const QuestionsHudContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const BreadcrumbsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 300px;
  padding-left: 2rem;
  z-index: 1000;
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

const Container = styled(FlexColumn)`
  padding-inline: 4rem;
  svg {
    [id*="--"] {
      cursor: pointer;
    }
  }
`;
