// import { Buffer } from "buffer";
// import fetch from "node-fetch";
import Head from "next/head";
import { ProcessogramsList } from "@/components/processograms/ProcessogramsList";
import { Element } from "types/elements";
import styled from "styled-components";
import { GetStaticPropsContext } from "next";
import { ElementData } from "types/element-data";
import {
  getElementsData,
  getPublicElements,
} from "@/api/react-query/public/useGetPublicElements";
import { FlexRow } from "@/components/desing-components/Flex";
import { ProgressogramHud } from "@/components/processograms/Hud";
import { useEffect, useMemo, useState } from "react";
import { getElementNameFromId } from "@/components/processograms/utils/extractInfoFromId";

type Props = {
  specie: string;
  elements: Element[];
  elementsData: ElementData[];
};

const PublicSpeciePage = ({ elements, specie, elementsData }: Props) => {
  const [active, setActive] = useState<string | null>(null);

  const [over, setOver] = useState<string | null>(null);

  const elementsMap = useMemo(() => {
    const map = new Map<string, Element>();

    elements.forEach((el) => {
      map.set(el._id, el);
    });

    return map;
  }, [elements]);

  const elementsDataMap = useMemo(() => {
    const map = new Map<string, ElementData>();

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

    console.log("over", over);

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

    const allData = elementsData.reduce((acc, el) => {
      const id = el.production_system_name;
      const dataValue = el.data[id];

      return {
        ...acc,
        [id]: dataValue,
      };
    }, {});

    return allData;
  }, [elementsData, active, elements, currentElement]);

  useEffect(() => {
    console.log(currentElement);
  }, [currentElement]);

  useEffect(() => {
    console.log(currentActiveElement);
  }, [currentActiveElement]);

  return (
    <Container>
      <Head>
        <title>Welfare Data - {specie}</title>
      </Head>
      <FlexRow>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "400px",
            zIndex: 1000,
          }}
        >
          <ProgressogramHud
            currentElement={currentElement ?? ""}
            data={elementsDataContent}
            notReady={false}
          />
        </div>
        <div
          style={{
            paddingLeft: "400px",
            overflow: "hidden",
          }}
        >
          <ProcessogramsList
            title="Dynamic title and description (under development)"
            elements={elements}
            elementsData={elementsData}
            onChange={setOver}
            onSelect={setActive}
          />
        </div>
      </FlexRow>
    </Container>
  );
};

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

  const [elements, elementsData] = await Promise.all([
    getPublicElements({ specie }),
    getElementsData({ specie }),
  ]);

  //const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

  // console.log("Converting images to base64...");

  // const elementsWithBase64 = await Promise.all(
  //   elements.map(async (el) => {
  //     const newRasterImages: Element["raster_images"] = {};

  //     for (const [key, img] of Object.entries(el.raster_images)) {
  //       try {
  //         const res = await fetch(img.src);
  //         const arrayBuffer = await res.arrayBuffer();
  //         const buffer = Buffer.from(arrayBuffer);

  //         if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
  //           console.warn(
  //             `Imagem ignorada por ser muito grande (${(
  //               buffer.length /
  //               1024 /
  //               1024
  //             ).toFixed(2)} MB):`,
  //             img.src
  //           );
  //           newRasterImages[key] = img; // mantém o src original
  //           continue;
  //         }

  //         const base64 = `data:image/png;base64,${buffer.toString("base64")}`;
  //         newRasterImages[key] = {
  //           ...img,
  //           src: base64,
  //         };
  //       } catch (error) {
  //         console.error("Erro ao converter imagem:", img.src, error);
  //         newRasterImages[key] = img; // fallback pro original
  //       }
  //     }

  //     return {
  //       ...el,
  //       raster_images: newRasterImages,
  //     };
  //   })
  // );

  return {
    props: {
      elements: elements,
      elementsData,
      specie,
    },
  };
}
