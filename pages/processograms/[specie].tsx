// import { Buffer } from "buffer";
// import fetch from "node-fetch";
import Head from "next/head";
import { ProcessogramsList } from "@/components/processograms/ProcessogramsList";
import { Processogram, ProcessogramHierarchy } from "types/processogram";
import styled from "styled-components";
import { GetStaticPropsContext } from "next";
import {
  getElementsData,
  getPublicElements,
  getSpecieByPathname,
} from "@/api/react-query/public/useGetPublicElements";
import { FlexRow } from "@/components/desing-components/Flex";
import { ProgressogramHud } from "@/components/processograms/Hud";
import { useMemo, useState } from "react";
import { getElementNameFromId } from "@/components/processograms/utils/extractInfoFromId";
import { Specie } from "types/species";
import { BreadcrumbHud } from "@/components/processograms/BreadcrumbHud";
import { ProcessogramData } from "types/processogram-data";

type Props = {
  specie: string;
  specieData: Specie;
  elements: Processogram[];
  elementsData: ProcessogramData[];
};

const PublicSpeciePage = ({
  elements,
  specie,
  elementsData,
  specieData,
}: Props) => {
  const [active, setActive] = useState<string | null>(null);

  const [over, setOver] = useState<string | null>(null);

  const [overHierarchy, setOverHierarchy] = useState<ProcessogramHierarchy[]>(
    []
  );

  const [activeHierarchy, setActiveHierarchy] = useState<
    ProcessogramHierarchy[]
  >([]);

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

  const hierarchy = useMemo(() => {
    const specieHierarchy = {
      id: specieData.pathname,
      level: "species",
      levelNumber: -1,
      name: specieData.name,
      rawId: specieData.pathname,
    };

    if (!active) {
      if (overHierarchy.length === 0) {
        return [
          {
            id: specieData.pathname,
            level: "species",
            levelNumber: 0,
            name: specieData.name,
            rawId: specieData.pathname,
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

  const elementsMap = useMemo(() => {
    const map = new Map<string, Processogram>();

    elements.forEach((el) => {
      map.set(el._id, el);
    });

    return map;
  }, [elements]);

  const elementsDataMap = useMemo(() => {
    const map = new Map<string, ProcessogramData>();

    elementsData.forEach((el) => {
      map.set(el.svg_element_id, el);
    });

    return map;
  }, [elementsData]);

  const currentActiveElement = useMemo(() => {
    if (!active) return null;

    const element = elementsMap.get(active);

    if (!element) return null;

    return getElementNameFromId(element.identifier);
  }, [active]);

  const currentElement = useMemo(() => {
    if (!over) return currentActiveElement;

    if (!!active) return over;

    const element = elementsMap.get(over);

    if (!element) return null;

    return getElementNameFromId(element.identifier);
  }, [over, active, elementsMap, currentActiveElement]);

  const elementsDataContent = useMemo(() => {
    if (!!active) {
      const elementData = elementsDataMap.get(active);

      if (!elementData) return {};

      return elementData.data;
    }

    const allData: {
      [key: string]: {
        description: string;
      };
    } = elementsData.reduce((acc, el) => {
      const id = el.production_system_name;
      const dataValue = el.data[id];

      return {
        ...acc,
        [id]: dataValue,
      };
    }, {});

    allData[specieData.pathname] = { description: specieData.description };

    return allData;
  }, [elementsData, active, elements, currentElement, specieData]);

  return (
    <Container>
      <Head>
        <title>Welfare Data - {specie}</title>
      </Head>
      <FlexRow>
        <BreadcrumbsContainer>
          <BreadcrumbHud hierarchy={hierarchy} />
        </BreadcrumbsContainer>
        <HudContainer>
          <ProgressogramHud
            currentElement={currentElement ?? specieData.pathname}
            data={elementsDataContent}
            notReady={false}
          />
        </HudContainer>
        <div
          style={{
            paddingLeft: "400px",
            overflow: "hidden",
          }}
        >
          <ProcessogramsList
            title="Dynamic title and description (under development)"
            elements={elements}
            onChange={onChangeOverItem}
            onSelect={onSelectItem}
          />
        </div>
      </FlexRow>
    </Container>
  );
};

const BreadcrumbsContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 400px;
  padding-left: 2rem;
  z-index: 1000;
`;

const HudContainer = styled.div`
  position: fixed;
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

  const [elements, elementsData, specieData] = await Promise.all([
    getPublicElements({ specie }),
    getElementsData({ specie }),
    getSpecieByPathname({ pathname: specie }),
  ]);

  return {
    props: {
      elements: elements,
      elementsData,
      specieData,
      specie,
    },
  };
}
