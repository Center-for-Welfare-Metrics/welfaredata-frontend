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
import { media } from "styles/media";
import { useNavBar } from "@/context/useNavBar/NavBarProvider";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { ThemeColors } from "theme/globalStyle";

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
  const { resolvedTheme, setTheme } = useTheme();

  const [eventBus, setEventBus] = useState<EventBus | null>(null);

  const [currentElement, setCurrentElement] = useState<string | null>(null);

  const [currentHierarchy, setHierarchy] = useState<ProcessogramHierarchy[]>(
    []
  );

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { publicNavBarRect } = useNavBar();

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
      setIsFetching(true);

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

      setIsFetching(false);
    };

    const rasterImages = getRasterImages({
      element: processogram,
      resolvedTheme,
    });

    if (rasterImages) {
      fetchBase64Images(rasterImages);
    }
  }, [processogram, resolvedTheme]);

  useEffect(() => {
    const bgColor = getBackgroundColor({
      theme: resolvedTheme,
      element: processogram,
    });

    if (
      resolvedTheme === "dark" &&
      bgColor === ThemeColors.fixedBackgroundWhite
    ) {
      setTheme("light");
      alert(
        "Sorry for the inconvenience, but this processogram is only available in light mode. The theme has been switched to light mode to ensure the best viewing experience."
      );
    } else if (
      resolvedTheme === "light" &&
      bgColor === ThemeColors.fixedBackgroundBlack
    ) {
      setTheme("dark");
      alert(
        "Sorry for the inconvenience, but this processogram is only available in dark mode. The theme has been switched to dark mode to ensure the best viewing experience."
      );
    }
  }, [processogram]);

  return (
    <Container
      style={{
        height: `calc(100vh - ${publicNavBarRect?.height}px)`,
      }}
    >
      <Head>
        <title>Welfare Data - {processogram.name}</title>
      </Head>
      <PageBody>
        <MainContainer height="100%" width="100%">
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
          <ProcessogramWrapper
            height="100%"
            width="100%"
            justify="center"
            style={{
              overflow: "hidden",
              backgroundColor: getBackgroundColor({
                theme: resolvedTheme,
                element: processogram,
              }),
              position: "relative",
            }}
          >
            {isFetching && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(5px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LoadingWrapper loading size={120} />
              </div>
            )}
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
          </ProcessogramWrapper>
        </MainContainer>
      </PageBody>
    </Container>
  );
};

const BreadcrumbsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HudContainer = styled.div`
  width: 400px;
  min-width: 400px;
  height: 100%;
  z-index: 1000;

  ${media.up.medium`
    width: 100vw;
    min-width: 100vw;
    height: 40vh;
    max-height: 40vh;
    min-height: 40vh;
  `}
`;

const ProcessogramWrapper = styled(FlexColumn)`
  padding-inline: 1rem;

  ${media.up.medium`
    padding-inline: 0rem;
    width: 95vw;
  `}
`;

const MainContainer = styled(FlexRow)`
  ${media.up.medium`
    flex-direction: column-reverse;
    gap: 0;
  `}
`;

const PageBody = styled(FlexRow)`
  width: 100%;
  height: 100%;
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
