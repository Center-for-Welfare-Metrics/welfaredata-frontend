import Head from "next/head";
import { GetStaticPropsContext } from "next";
import styled from "styled-components";

import { getProcessogramAndDataBySlug } from "@/api/react-query/public/useGetPublicProcessograms";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Processogram, ProcessogramHierarchy } from "types/processogram";
import { ProcessogramData } from "types/processogram-data";
import { ProcessogramQuestionData } from "types/processogram-questions";
import { BreadcrumbHud } from "@/components/processograms/huds/BreadcrumbHud";
import { ProgressogramMainHud } from "@/components/processograms/huds/ProcessogramMainHud";
import { ProcessogramComplete } from "@/components/processograms/ProcessogramComplete";
import {
  getBackgroundColor,
  getRasterImages,
  getSvgUrl,
} from "@/utils/processogram-theme";
import { useTheme } from "next-themes";
import { EventBus } from "@/components/processograms/ProcessogramComplete/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getElementNameFromId } from "@/components/processograms/utils/extractInfoFromId";

type HomeProps = {
  processogram: Processogram;
  processogramData: ProcessogramData;
  processogramQuestions: ProcessogramQuestionData;
};

const ProcessogramPage = ({
  processogram,
  processogramData,
  processogramQuestions,
}: HomeProps) => {
  const { resolvedTheme } = useTheme();

  const [eventBus, setEventBus] = useState<EventBus | null>(null);

  const [currentElement, setCurrentElement] = useState<string | null>(null);

  const [currentHierarchy, setHierarchy] = useState<ProcessogramHierarchy[]>(
    []
  );

  const hierarchy = useMemo(() => {
    if (currentHierarchy.length > 0) return currentHierarchy;

    if (!processogram) return [];

    return [
      {
        id: processogram.identifier,
        level: "Production System",
        levelNumber: 1,
        name: processogram.name,
        rawId: processogram.identifier,
      },
    ];
  }, [currentHierarchy, processogram]);

  const onClickBreadcrumb = (id: string) => {
    eventBus?.publish({
      type: "CHANGE_LEVEL",
      payload: {
        id,
      },
    });
  };

  const onClose = useCallback(() => {}, []);

  const handleChange = (id: string, hierarchy: ProcessogramHierarchy[]) => {
    setCurrentElement(id);
    setHierarchy(hierarchy);
  };

  const base64ImagesRef = useRef<Map<string, string>>(
    new Map<string, string>()
  );

  useEffect(() => {
    const fetchBase64Images = async (rasterImages: {
      [key: string]: { src: string };
    }) => {
      const promises = Object.entries(rasterImages).map(
        async ([key, value]) => {
          const response = await fetch(value.src, {
            method: "GET",
            headers: { "Cache-Control": "no-cache" },
          });
          const blob = await response.blob();
          return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result as string;
              base64ImagesRef.current.set(key, base64data ?? value.src);
              resolve();
            };
          });
        }
      );

      await Promise.all(promises);
    };

    const rasterImages = getRasterImages({
      element: processogram,
      resolvedTheme,
    });

    if (rasterImages) {
      fetchBase64Images(rasterImages);
    }
  }, [processogram]);

  return (
    <Container>
      <Head>
        <title>Welfare Data - {processogram.name}</title>
      </Head>
      <PageBody>
        <FlexRow height="100%" width="100%">
          <HudContainer>
            <ProgressogramMainHud
              currentElement={
                currentElement || getElementNameFromId(processogram.identifier)
              }
              data={processogramData.data}
              notReady={false}
              hierarchy={hierarchy}
              questionData={processogramQuestions}
              processogramId={processogram._id}
            />
          </HudContainer>
          <FlexColumn
            height="100%"
            width="100%"
            justify="center"
            px={1}
            style={{
              overflow: "hidden",
              backgroundColor: getBackgroundColor({
                theme: resolvedTheme,
                element: processogram,
              }),
              position: "relative",
            }}
          >
            <BreadcrumbsContainer>
              <BreadcrumbHud
                hierarchy={hierarchy}
                onClick={onClickBreadcrumb}
              />
            </BreadcrumbsContainer>
            <ProcessogramComplete
              src={
                getSvgUrl({
                  element: processogram,
                  theme: resolvedTheme,
                }) ?? ""
              }
              element={processogram}
              rasterImages={getRasterImages({
                element: processogram,
                resolvedTheme,
              })}
              enableBruteOptimization={false}
              onChange={handleChange}
              eventBusHandler={setEventBus}
              onClose={onClose}
              maxHeight="70vh"
              startFromSpecie={false}
              isActive={true}
              base64ImagesRef={base64ImagesRef}
            />
          </FlexColumn>
        </FlexRow>
      </PageBody>
    </Container>
  );
};

const PageBody = styled(FlexRow)`
  height: calc(100vh - 103px);
  width: 100%;
`;

const BreadcrumbsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HudContainer = styled.div`
  top: 0;
  left: 0;
  width: 400px;
  height: 100%;
  z-index: 1000;
`;

const Container = styled(FlexColumn)`
  svg {
    [id*="--"] {
      cursor: pointer;
    }
  }
`;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const {
    pathname,
    slug,
    processogram: processogramSlug,
  } = context.params as {
    pathname: string;
    slug: string;
    processogram: string;
  };

  const processograms = await getProcessogramAndDataBySlug({
    specie: pathname,
    productionModule: slug,
    processogram: processogramSlug,
  });

  return {
    props: {
      processogram: processograms.processogram,
      processogramData: processograms.processogramData,
      processogramQuestions: processograms.processogramQuestions,
    },
    revalidate: 60,
  };
}

export default ProcessogramPage;
