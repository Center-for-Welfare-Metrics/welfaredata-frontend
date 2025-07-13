import Head from "next/head";
import { ProcessogramsList } from "@/components/processograms/ProcessogramsList";
import { Processogram, ProcessogramHierarchy } from "types/processogram";
import styled from "styled-components";
import { GetStaticPropsContext } from "next";
import {
  getPublicProcessograms,
  getPublicProcessogramDatas,
  getPublicSpeciesByPathname,
  getPublicProcessogramQuestions,
} from "@/api/react-query/public/useGetPublicProcessograms";
import { FlexRow } from "@/components/desing-components/Flex";
import { useMemo, useRef, useState } from "react";
import { getElementNameFromId } from "@/components/processograms/utils/extractInfoFromId";
import { Specie } from "types/species";
import { BreadcrumbHud } from "@/components/processograms/huds/BreadcrumbHud";
import { ProcessogramData } from "types/processogram-data";
import { EventBus } from "@/components/processograms/ProcessogramComplete/types";
import { ProgressogramMainHud } from "@/components/processograms/huds/ProcessogramMainHud";
import { ThemeColors } from "theme/globalStyle";
import { ProcessogramQuestionData } from "types/processogram-questions";
import { ThemeToggler } from "@/components/ThemeToggler";

type Props = {
  specie: string;
  speciesData: Specie;
  processograms: Processogram[];
  processogramDatas: ProcessogramData[];
  processogramQuestions: ProcessogramQuestionData[];
};

const PublicSpeciePage = ({
  processograms,
  specie,
  processogramDatas,
  processogramQuestions,
  speciesData,
}: Props) => {
  const [active, setActive] = useState<string | null>(null);

  const [over, setOver] = useState<string | null>(null);

  const [overHierarchy, setOverHierarchy] = useState<ProcessogramHierarchy[]>(
    []
  );

  const [activeHierarchy, setActiveHierarchy] = useState<
    ProcessogramHierarchy[]
  >([]);

  const [eventBus, setEventBus] = useState<EventBus | null>(null);

  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const onChangeOverItem = (
    id: string | null,
    hierarchy: ProcessogramHierarchy[]
  ) => {
    setOverHierarchy(hierarchy);
    setOver(id);
  };

  const onSelectItem = (
    id: string | null,
    hierarchy: ProcessogramHierarchy[]
  ) => {
    setActiveHierarchy(hierarchy);
    setActive(id);
  };

  const onClickBreadcrumb = (id: string) => {
    if (id === speciesData.pathname) {
      eventBus?.publish({
        type: "CLOSE",
        payload: {},
      });
      return;
    }

    eventBus?.publish({
      type: "CHANGE_LEVEL",
      payload: {
        id,
      },
    });
  };

  const hierarchy = useMemo(() => {
    const specieHierarchy = {
      id: speciesData.pathname,
      level: "species",
      levelNumber: -1,
      name: speciesData.name,
      rawId: speciesData.pathname,
    };

    if (!active) {
      if (overHierarchy.length === 0) {
        return [
          {
            id: speciesData.pathname,
            level: "species",
            levelNumber: 0,
            name: speciesData.name,
            rawId: speciesData.pathname,
          },
        ];
      } else {
        return [specieHierarchy, ...overHierarchy];
      }
    }

    if (overHierarchy.length > 0) {
      return [specieHierarchy, ...overHierarchy];
    }

    return [specieHierarchy, ...activeHierarchy];
  }, [overHierarchy, activeHierarchy, active]);

  const processogramsMap = useMemo(() => {
    const map = new Map<string, Processogram>();

    processograms.forEach((el) => {
      map.set(el._id, el);
    });

    return map;
  }, [processograms]);

  const selectedItemTheme = useMemo(() => {
    if (!active) return null;

    const element = processogramsMap.get(active);

    if (!element) return null;

    return element.theme;
  }, [active, processogramsMap]);

  const processogramDatasMap = useMemo(() => {
    const map = new Map<string, ProcessogramData>();

    processogramDatas.forEach((el) => {
      map.set(el.processogram_id, el);
    });

    return map;
  }, [processogramDatas]);

  const processogramQuestionsMap = useMemo(() => {
    const map = new Map<string, ProcessogramQuestionData>();

    processogramQuestions.forEach((el) => {
      map.set(el.processogram_id, el);
    });

    return map;
  }, [processogramQuestions]);

  const currentActiveElement = useMemo(() => {
    if (!active) return null;

    const element = processogramsMap.get(active);

    if (!element) return null;

    return getElementNameFromId(element.identifier);
  }, [active]);

  const currentElement = useMemo(() => {
    if (!over) return currentActiveElement;

    if (!!active) return over;

    const element = processogramsMap.get(over);

    if (!element) return null;

    return getElementNameFromId(element.identifier);
  }, [over, active, processogramsMap, currentActiveElement]);

  const elementsDataContent = useMemo(() => {
    if (!!active) {
      const elementData = processogramDatasMap.get(active);

      if (!elementData) return {};

      return elementData.data;
    }

    const allData: {
      [key: string]: {
        description: string;
      };
    } = processogramDatas.reduce((acc, el) => {
      const id = el.production_system_name;
      const dataValue = el.data[id];

      return {
        ...acc,
        [id]: dataValue,
      };
    }, {});

    allData[speciesData.pathname] = { description: speciesData.description };

    return allData;
  }, [processogramDatas, active, processograms, currentElement, speciesData]);

  const currentProcessogramQuestions = useMemo(() => {
    if (!active) return null;

    return processogramQuestionsMap.get(active) ?? null;
  }, [active, processogramQuestionsMap]);

  return (
    <Container>
      <Head>
        <title>Welfare Data - {specie}</title>
      </Head>
      <FlexRow height="100%">
        <BreadcrumbsContainer>
          <BreadcrumbHud hierarchy={hierarchy} onClick={onClickBreadcrumb} />
        </BreadcrumbsContainer>
        <FlexRow width="100%" height="100%">
          <HudContainer>
            <ProgressogramMainHud
              currentElement={currentElement ?? speciesData.pathname}
              data={elementsDataContent}
              notReady={false}
              hierarchy={hierarchy}
              questionData={currentProcessogramQuestions}
            />
          </HudContainer>
          <ProcessogramListContainer
            ref={listContainerRef}
            style={{
              backgroundColor:
                selectedItemTheme === "light"
                  ? ThemeColors.fixedBackgroundWhite
                  : undefined,
            }}
          >
            <ProcessogramsList
              title="Dynamic title and description (under development)"
              elements={processograms}
              onChange={onChangeOverItem}
              onSelect={onSelectItem}
              eventBusHandler={setEventBus}
              listContainerRef={listContainerRef}
            />
          </ProcessogramListContainer>
        </FlexRow>
      </FlexRow>
      <ThemeTogglerContainer>
        <ThemeToggler />
      </ThemeTogglerContainer>
    </Container>
  );
};

const ThemeTogglerContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  border-radius: 8rem;
  background-color: ${ThemeColors.grey_50};
`;

const ProcessogramListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  transition: background-color 500ms;
`;

const BreadcrumbsContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 400px;
  padding-left: 2rem;
  z-index: 1000;
`;

const HudContainer = styled.div`
  top: 0;
  left: 0;
  width: 400px;
  height: 100%;
  z-index: 1000;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export default PublicSpeciePage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { specie } = context.params as { specie: string };

  // const [processograms, processogramDatas, speciesData, processogramQuestions] =
  //   await Promise.all([
  //     getPublicProcessograms({ specie }),
  //     getPublicProcessogramDatas({ specie }),
  //     getPublicSpeciesByPathname({ pathname: specie }),
  //     getPublicProcessogramQuestions({ specie }),
  //   ]);

  return {
    props: {
      processograms: [],
      processogramDatas: [],
      speciesData: [],
      specie,
      processogramQuestions: [],
    },
  };
}
