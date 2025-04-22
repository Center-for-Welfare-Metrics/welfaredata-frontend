import { Buffer } from "buffer";
import fetch from "node-fetch";
import publicApi from "queries/public";
import Head from "next/head";
import { ProcessogramsList } from "@/components/processograms/ProcessogramsList";
import { Element } from "types/elements";
import styled from "styled-components";
import { GetStaticPropsContext } from "next";

type Props = {
  specie: string;
  elements: Element[];
};

const PublicSpeciePage = ({ elements, specie }: Props) => {
  return (
    <Container>
      <Head>
        <title>Welfare Data - {specie}</title>
      </Head>
      <ProcessogramsList
        title="The life of market pigs in four production systems (this will be dynamic)"
        elements={elements}
      />
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

  let elements: Element[] = await (await publicApi.getElements(specie)).data;

  const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

  console.log("Converting images to base64...");

  const elementsWithBase64 = await Promise.all(
    elements.map(async (el) => {
      const newRasterImages: Element["raster_images"] = {};

      for (const [key, img] of Object.entries(el.raster_images)) {
        try {
          const res = await fetch(img.src);
          const buffer = await res.buffer();

          if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
            console.warn(
              `Imagem ignorada por ser muito grande (${(
                buffer.length /
                1024 /
                1024
              ).toFixed(2)} MB):`,
              img.src
            );
            newRasterImages[key] = img; // mantém o src original
            continue;
          }

          const base64 = `data:image/png;base64,${buffer.toString("base64")}`;
          newRasterImages[key] = {
            ...img,
            src: base64,
          };
        } catch (error) {
          console.error("Erro ao converter imagem:", img.src, error);
          newRasterImages[key] = img; // fallback pro original
        }
      }

      return {
        ...el,
        raster_images: newRasterImages,
      };
    })
  );

  return {
    props: {
      elements: elementsWithBase64,
      specie,
    },
  };
}
